import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import categories from "../utils/getCategories";
import { useState } from "react"

export default function GoalSteps({ steps, setSteps, reset, goal, setGoal }) {

  const [category, setCategory] = useState(null);

  // replace this with imported "categories" once API get route works
  const dummyCategories = [
    {
      id: uuidv4(),
      name: "Social"
    },
    {
      id: uuidv4(),
      name: "Travel"
    },
    {
      id: uuidv4(),
      name: "Entertainment"
    },
    {
      id: uuidv4(),
      name: "Skill"
    },
    {
      id: uuidv4(),
      name: "Misc."
    }
  ]

  // format goal and step items, add them to database
  function onNewGoalSubmit(e) {
    e.preventDefault();

    const btnName = e.nativeEvent.submitter.name;

    // process new goal submit here...

    // make sure that goal and step titles are not an empty string...
  }

  // handle text input
  function handleInputChange(e) {

    // change goal title
    if (e.target.name === "goal")
      setGoal(e.target.value);

    // change step title/description
    else {
      setSteps(steps.map(item => {
        if (item.id != e.target.id)
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
        if (item.id != e.target.id)
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
    setSteps(steps.filter(item => item.id != e.target.id));
  }

  // add new blank step
  function handleAddStep(e) {
    setSteps([
      ...steps,
      {
        id: uuidv4(),
        title: "",
        description: "",
        completed: false
      }
    ]);
  }

  return (
    <>
      <form onSubmit={onNewGoalSubmit} className="form">
        <div className="d-flex align-items-center">
          <label htmlFor="complete-all">Mark All Completed:</label>
          <input className="checkbox" type="checkbox" defaultChecked={false} id="complete-all" onChange={handleCheck} />
          <div className="w-50">
            <label htmlFor="goal">Goal Title:</label>
            <input type="text" name="goal" id="goal" className="form-control" value={goal} onChange={handleInputChange} />
          </div>
          <button className="ms-2" type="reset" onClick={reset}>Clear All</button>
        </div>

        {steps.map(item => (
          <div key={item.id} >
            <div className="d-flex align-items-center">
              <div className="form-group">
                <label htmlFor={item.id}>Completed:</label>
                <input className="checkbox" type="checkbox" checked={item.completed} id={item.id} onChange={handleCheck} />
              </div>
              <div className="form-group col-6">
                <label htmlFor={item.id}>Step Title:</label>
                <input className="form-control" name="title" type="text" value={item.title} id={item.id} onChange={handleInputChange} />
              </div>
              <button className="ms-2" id={item.id} onClick={handleDeleteStep}>Delete Step</button>
            </div>

            <div>
              <div className="form-group col-6">
                <label htmlFor={item.id}>Description:</label>
                <input className="form-control" name="description" type="text" value={item.description} id={item.id} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        ))}

        <button onClick={handleAddStep}>Add Step</button>

        <DropdownButton id="dropdown-basic-button" title={category ? category : "Goal Category"}>
          {dummyCategories.map((dummyCategory) => (
            <Dropdown.Item key={dummyCategory.id} onClick={(e) => { setCategory(e.target.text) }}>{dummyCategory.name}</Dropdown.Item>
          ))}
        </DropdownButton>

        <div className="d-flex">
          <button onClick={() => console.log("save goal clicked")}>Save Goal</button>
          <button type="reset" onClick={reset}>Start Over</button>
        </div>
      </form>
    </>
  )
}
