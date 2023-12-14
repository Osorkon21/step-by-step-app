import { v4 as uuidv4 } from "uuid"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppProvider"

export default function GoalSteps({ steps, setSteps, reset, goal, setGoal, usage, setSubmitError }) {

  const appCtx = useAppCtx()

  const [category, setCategory] = useState(goal.category?.name || null);
  const [categories, setCategories] = useState(null);

  // format goal and step items, add them to database
  async function handleFormSubmit(e) {
    e.preventDefault();
    setSubmitError("");

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

    // change goal title
    if (e.target.name === "goal")
      setGoal({ ...goal, name: e.target.value });

    // change step title/text
    else {
      setSteps(steps.map(item => {
        if (item.uuid != e.target.id)
          return item;

        return {
          ...item,
          [e.target.name]: e.target.value
        }
      }));
    }
  }

  // marks steps as completed or not completed
  function handleCheck(e) {

    // checks/unchecks all checkboxes
    if (e.target.id === "complete-all") {
      setSteps(steps.map((item) => item = { ...item, completed: e.target.checked }));
    }

    // checks/unchecks one checkbox
    else {
      setSteps(steps.map(item => {
        if (item.uuid != e.target.id)
          return item;

        return {
          ...item,
          completed: e.target.checked
        }
      }));
    }
  }

  // remove step item from steps array
  function handleDeleteStep(e) {
    setSteps(steps.filter(item => item.uuid != e.target.id));
  }

  // add new blank step
  function handleAddStep(e) {
    setSteps([
      ...steps,
      {
        uuid: uuidv4(),
        title: "",
        text: "",
        completed: false
      }
    ]);
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
  }, [categories])

  return (
    <>
      <form onSubmit={handleFormSubmit} className="form">
        <div className="d-flex align-items-center">
          <label htmlFor="complete-all">Mark All Completed:</label>
          <input className="checkbox" type="checkbox" defaultChecked={false} id="complete-all" onChange={handleCheck} />
          <div className="w-50">
            <label htmlFor="goal">Goal Title:</label>
            <input type="text" name="goal" id="goal" className="form-control" value={goal.name} onChange={handleInputChange} />
          </div>
          <button className="ms-2" type="reset" onClick={reset}>Clear All</button>
        </div>

        {steps.map(item => (
          <div className="step" key={item.uuid} >
            <button type="button" className="ms-2" id={item.uuid} onClick={handleDeleteStep}>Delete Step</button>
              <div className="form-group">
                <label htmlFor={item.uuid}>Completed:</label>
                <input className="checkbox" type="checkbox" checked={item.completed} id={item.uuid} onChange={handleCheck} />
              </div>
            <div className="input-container">
              <div className="form-group col-12">
                <label htmlFor={item.uuid}>Step Title:</label>
                <textarea className="input form-control" name="title" value={item.title} id={item.uuid} onChange={handleInputChange} />
              </div>
            </div>
            {/* <div className="d-flex align-items-center">
            </div> */}

            <div className="input-container">
              <div className="form-group col-12">
                <label htmlFor={item.uuid}>Description:</label>
                <textarea className="input form-control" name="text" value={item.text} id={item.uuid} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={handleAddStep}>Add Step</button>

        <DropdownButton id="dropdown-basic-button" title={category ? category : "Goal Category"}>
          {categories?.map((category) => (
            <Dropdown.Item key={category.id} onClick={(e) => { setCategory(e.target.text) }}>{category.name}</Dropdown.Item>
          ))}
        </DropdownButton>

        <div className="d-flex">
          <button type="submit">Save Goal</button>
          <button type="reset" onClick={reset}>Clear All</button>
        </div>
      </form>
    </>
  )
}
