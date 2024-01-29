import { v4 as uuidv4 } from "uuid"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppProvider"
import { SignupModal, StepBar } from "./"

export default function GoalSteps({ steps, setSteps, reset, goal, setGoal, usage, setSubmitError, defaultChecked }) {

  const appCtx = useAppCtx()

  const [category, setCategory] = useState(goal.category?.name || null);
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
    else if (!category) {
      setSubmitError("Goal must have a category!");
      return;
    }

    const catToUse = categories.find((cat) => cat.name === category);

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

      // go to dashboard after creating/updating goal
      window.location.href = "/dashboard";
    }
    else {
      console.log(response);
      setSubmitError("Database error - unable to save goal!");
    }
  }

  // handle text input
  function handleInputChange(e) {

    // change step title/text
    setSteps(steps.map(step => {
      if (!e.target.className.includes(step.uuid))
        return step;

      return {
        ...step,
        [e.target.name]: e.target.value
      }
    }));
  }

  // marks steps as completed or not completed
  function handleCheck(e) {

    // checks/unchecks all checkboxes
    if (e.target.id === "complete-all") {
      setSteps(steps.map((item) => item = { ...item, completed: e.target.checked }));
    }

    // checks/unchecks one checkbox
    else {
      setSteps(steps.map(step => {
        if (!e.target.className.includes(step.uuid))
          return step;

        return {
          ...step,
          completed: e.target.checked
        }
      }));
    }
  }

  // remove step item from steps array
  function handleDeleteStep(e) {
    setSteps(steps.filter(step => !e.target.className.includes(step.uuid)));
  }

  // add new blank step, open it for editing
  function handleAddStep(e) {
    const newStep = {
      uuid: uuidv4(),
      title: "",
      text: "",
      completed: false
    };

    setSteps([
      ...steps,
      newStep
    ]);

    setCurrentStep(newStep);
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

  useEffect(() => {
    if (!categories)
      getCategories();
  }, [categories]);



  return (
    <>
      <form onSubmit={handleFormSubmit} className="form">
        <div className="add-goal-items">
          <div className="col-sm m-1">
            <label htmlFor="complete-all">Check/Uncheck All:</label>
            <input className="checkbox" type="checkbox" defaultChecked={defaultChecked} id="complete-all" onChange={handleCheck} />
            <button className="col-sm update-goal-btn" type="reset" onClick={reset}>Clear All</button>
          </div>
        </div>

        {steps.map(step => (
          <div key={step.uuid}>
            {(currentStep && (step.uuid === currentStep.uuid)) ?
              <div className="step">
                <div className="input-container">
                  <div className="form-group col-12">
                    <textarea className={`input form-control ${step.uuid}`} name="title" value={step.title} placeholder="Step title" onChange={handleInputChange} />
                  </div>
                </div>

                <div className="input-container">
                  <div className="form-group col-12">
                    <textarea className={`input form-control ${step.uuid}`} name="text" value={step.text} placeholder="Step description" onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              :
              <StepBar
                step={step}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                handleDeleteStep={handleDeleteStep}
              ></StepBar>
            }
          </div>
        ))}

        <button className="update-goal-btn mt-3" type="button" onClick={handleAddStep}>Add Step</button>

        <DropdownButton id="dropdown-basic-button" title={category ? category : "Goal Category"}>
          {categories?.map((category) => (
            <Dropdown.Item key={category.id} onClick={(e) => { setCategory(e.target.text) }}>{category.name}</Dropdown.Item>
          ))}
        </DropdownButton>

        <div className=" ">
          {appCtx.user?._id !== undefined ? (
            <button className="update-goal-btn m-2" type="submit">Save Goal</button>
          )
            : (
              <SignupModal
                buttonText={"Sign up to save goal!"}
                setGoalStepsSubmitError={setSubmitError}
              ></SignupModal>
            )}

          <button className="update-goal-btn m-2" type="reset" onClick={reset}>Clear All</button>
        </div>
      </form>
    </>
  )
}
