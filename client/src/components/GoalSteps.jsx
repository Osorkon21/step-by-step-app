import { v4 as uuidv4 } from "uuid"
import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppProvider"
import { ModalWithDialogTrigger, StepBar, TriggerButton, SignupModal, CategorySelect } from "./"

export default function GoalSteps({ steps, setSteps, reset, goal, setGoal, usage, setSubmitError, defaultChecked }) {

  const appCtx = useAppCtx();

  const [categories, setCategories] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);

  // format goal and step items, add them to database
  async function handleFormSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    if (appCtx.user?._id === undefined)
      return;

    // remove all steps without a title
    const filteredSteps = steps.filter(step => step.title);

    // if required field is empty, display error
    if (!goal.name) {
      setSubmitError("Goal must have a title!");
      return;
    }
    else if (!filteredSteps.length) {
      setSubmitError("At least one step must have a title!");
      return;
    }
    else if (!goal.category) {
      setSubmitError("Goal must have a category!");
      return;
    }

    const catToUse = categories.find((cat) => cat.name === goal.category.name);

    const newGoal = {
      name: goal.name,

      // if all steps are completed, goal is completed
      completed: filteredSteps.every((step) => step.completed),

      category: catToUse.id,
      steps: filteredSteps
    }

    var response;

    if (usage === "createGoal") {
      response = await fetch('/api/goals', {
        method: 'POST',
        body: JSON.stringify({ goal: newGoal, userId: appCtx.user._id }),
        headers: { 'Content-Type': 'application/json' },
      });
    }
    else if (usage === "updateGoal") {
      response = await fetch(`/api/goals/${goal._id}`, {
        method: 'PUT',
        body: JSON.stringify({ goal: newGoal }),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (response.ok) {

      // refresh dashboard after creating/updating goal
      window.location.href = "/";
    }
    else {
      console.log(response);
      setSubmitError("Database error - unable to save goal!");
    }
  }

  function handleGoalNameChange(e) {
    setGoal({
      ...goal,
      [e.target.name]: e.target.value
    })
  }

  // handle text input
  function handleInputChange(e) {

    //extract UUID from the class name
    const uuid = e.target.getAttribute('data-uuid');
    const { name, value } = e.target;

    // change step title/text
    setSteps(steps.map(step => {
      if (step.uuid !== uuid)
        return step;

      return {
        ...step,
        [name]: value // Dynamically update the property based on the input's name attribute
      }
    }));
  }

  // marks steps as completed or not completed
  function handleCheck(arg) {

    // checks/unchecks one checkbox
    if (typeof arg === "string") {
      // if arg  is a string,, its assumed to be the UUID for an individual step
      const uuid = arg;
      setSteps(steps.map(step => {
        if (step.uuid !== uuid)
          return step;
        return {
          ...step,
          completed: !step.completed // Toggle the completed state
        };
      }));
    }


    // checks/unchecks all checkboxes
    else if (arg && arg.target) {
      // if arg is an event, its assumed to be the event object for a checkbox click
      const e = arg;
      if (e.target.id === "complete-all") {
        setSteps(steps.map(item => ({ ...item, completed: e.target.checked })));
      }
    }
  }

  // remove step item from steps array
  function deleteStep(uuid) {
    const newSteps = steps.filter(step => step.uuid !== uuid);

    // if all steps have been deleted, create new blank step, open it for editing
    if (!newSteps.length)
      addStartingStep();
    else
      setSteps(newSteps);
  }

  function createBlankStep() {
    return {
      uuid: uuidv4(),
      title: "",
      text: "",
      completed: false
    };
  }

  // add new blank step, open it for editing
  function handleAddStep(e) {
    const newStep = createBlankStep();

    setSteps([
      ...steps,
      newStep
    ]);

    setCurrentStep(newStep);
  }

  function addStartingStep() {
    const newStep = createBlankStep();

    setSteps([newStep]);
  }

  async function getCategories() {
    try {
      // get all categories
      const query = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const response = await query.json();
      setCategories(response.payload.map(function (category) { return { id: category._id, name: category.name } }));
    }
    catch (err) {
      console.log(err.message);
    }
  }

  function handleSelectionChange(key) {
    setGoal({
      ...goal,
      category: {
        name: key
      }
    })
  }

  useEffect(() => {
    if (!categories)
      getCategories();
  }, [categories]);

  useEffect(() => {
    if (steps.length === 1 && currentStep !== steps[0])
      setCurrentStep(steps[0]);
  }, [steps]);

  return (
    <>
      <form onSubmit={handleFormSubmit} className="w-full gap-2">
        <div className="add-goal-items gap-2 mt-2 flex flex-col items-center justify-center">

          {usage === "createGoal" &&
            <input className="flex items-center justify-center w-full rounded-3xl p-2 pl-4 shadow-custom focus:bg-white hover:bg-white focus:outline-none bg-lightgray focus:shadow" type="text" placeholder="Your goal, ex. Learn computer programming" name="name" value={goal.name} onChange={handleGoalNameChange} />
          }

          {usage === "updateGoal" &&
            <div className="gap-2 flex items-center justify-center">
              <label htmlFor="complete-all">Complete All Steps:</label>
              <input className="checkbox" type="checkbox" defaultChecked={defaultChecked} id="complete-all" onChange={handleCheck} />
            </div>
          }
        </div>

        {steps.map(step => (

          <div className="step flex" key={step.uuid}>
            <StepBar
              goal={goal}
              usage={usage}
              step={step}
              steps={steps}
              setSteps={setSteps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              handleCheck={handleCheck}
              handleInputChange={handleInputChange}
              deleteStep={deleteStep}
            ></StepBar>

          </div>
        ))}

        <button className="update-goal-btn hover:scale-95 mt-2" type="button" onClick={handleAddStep}>Add Step</button>
        <div className="ag-cat-drop mt-2 ">
          <CategorySelect className="mt-2 "
            category={goal.category.name}
            categories={categories}
            handleSelectionChange={handleSelectionChange}
          ></CategorySelect>

        </div>

        <div className="mt-2 gap-2 flex">
          {appCtx.user?._id !== undefined ? (
            <button className="update-goal-btn hover:scale-95" type="submit">Save Goal</button>
          )
            : (
              <ModalWithDialogTrigger
                trigger={<TriggerButton
                  buttonText={"Sign up to save goal!"}
                ></TriggerButton>}
                modal={<SignupModal
                  setGoalStepsSubmitError={setSubmitError}
                ></SignupModal>}
              ></ModalWithDialogTrigger>
            )}

          {usage === "createGoal" &&
            <button className="update-goal-btn hover:scale-95" type="reset" onClick={reset}>Start Over</button>
          }
        </div>
      </form>
    </>
  )
}
