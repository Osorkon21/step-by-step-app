import { useState, useEffect } from "react"

export default function AddGoal() {
  const [goal, setGoal] = useState("");
  const [goalSelected, setGoalSelected] = useState(false);
  const [steps, setSteps] = useState([]);
  const [submitError, setSubmitError] = useState("");

  async function setRandomGoal() {
    setSubmitError("");

    // make a call to a random goal generator API here

    // set randomGoal to whatever API response we use to generate a random goal
    const randomGoal = "<put-random-goal-here>"

    setGoal(randomGoal);
  }

  function reset() {
    setGoal("");
    setGoalSelected(false);
    setSteps([]);
    setSubmitError("");
  }

  async function generateSteps() {
    // make chatGPT API call here

    // chatGPT response needs to be formatted into an array of step objects, use this sample template for now
    const formattedAIResponse = [
      {
        id: 0,
        title: "placeholderTitle",
        description: "placeholderContent",
        completed: false
      },
      {
        id: 1,
        title: "placeholderTitle2",
        description: "placeholderContent2",
        completed: false
      },
      {
        id: 2,
        title: "placeholderTitle3",
        description: "placeholderContent3",
        completed: false
      },
      {
        id: 3,
        title: "placeholderTitle4",
        description: "placeholderContent4",
        completed: false
      }
    ];

    setSteps(formattedAIResponse);
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    const btnName = e.nativeEvent.submitter.name;

    // displays a random goal
    if (btnName === "random-goal") {
      setRandomGoal();
      return;
    }

    if (goal) {
      setGoalSelected(true);

      // have chatGPT generate steps
      if (btnName === "generate") {
        generateSteps();
      }
      // does not call chatGPT API
      else if (btnName === "no-generate") {
        setSteps([{ id: 0, title: "", description: "", completed: false }]);
      }
    }
    else
      setSubmitError("Goal cannot be blank!");
  }

  function onNewGoalSubmit(e) {
    e.preventDefault();

    const btnName = e.nativeEvent.submitter.name;

    // start over button
    if (btnName === "reset") {
      reset();
      return;
    }

    // process new goal submit here...

    // make sure that goal and step titles are not an empty string...
  }

  function handleInputChange(e) {
    setGoal(e.target.value);
  }

  // mark all steps as completed or not completed
  function handleCheckAllChange(e) {
    setSteps(steps.map((item) => item = { ...item, completed: e.target.checked }));
  }

  // re-render page when steps is changed - we might need this
  // useEffect(() => {
  //   console.log("steps has changed. Value:", steps);
  // }, [steps]);

  return (
    <>
      {/* if no goal has been submitted, display goal entry form */}
      {!goalSelected ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <div>
              <div className="d-flex">
                <label className="d-block mb-1 me-2">What is your new goal?</label>
                <input type="text" className="col-4" name="goal" value={goal} onChange={handleInputChange} />
                <button className="ms-4" name="random-goal">Generate Random Goal</button>
              </div>
            </div>
            <div className="btn-container d-flex">
              <button className="mt-2 me-2" name="generate">Generate Steps</button>
              <button className="mt-2" name="no-generate">I Know The Steps</button>
            </div>
          </div>
          <div className="text-danger">
            {submitError}
          </div>
        </form>
      ) :
        // if goal has been submitted, render this
        <>
          {/* makes sure steps array is populated before rendering */}
          {steps.length ? (
            <form onSubmit={onNewGoalSubmit} className="form">
              <div className="d-flex">
                <label htmlFor="completed">Mark All Completed:</label>
                <input className="checkbox" type="checkbox" defaultChecked={false} id="completed" onClick={handleCheckAllChange} />
                <input type="text" name="goal" className="form-control w-50" value={goal} onChange={handleInputChange} />
                <button className="ms-2" name="reset">Start Over</button>
              </div>

              {/* start here, read from steps and spit out title and description text inputs... */}
              {steps.map(item => (
                <div key={item.id}>
                  <div className="form-group">
                    <label htmlFor="input-done">Done:</label>
                    <input name="done" className="checkbox" type="checkbox" defaultChecked={false} id="input-done" onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <input name="name" className="form-control" type="text" value={item.title} id="title" onChange={handleInputChange} />
                  </div>
                </div>

              ))}
            </form>
          ) : (
            // while waiting on API response, display this
            <div className="text-success">Loading...</div>
          )}
        </>
      }
    </>
  )
}

{/* <table className="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Priority</th>
      <th>Completed?</th>
    </tr>
  </thead>

  <tbody>
    {steps.map(item => (
      <tr key={item.id}>
        <td>
          <Link to={`/bucket/${item.id}`}>
            {item.name}
          </Link>
        </td>
        <td>{item.priority}</td>
        <td>{item.completed ? "Yes" : "No"}</td>
      </tr>
    ))}
  </tbody>

</table> */}
