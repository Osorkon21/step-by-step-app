import { useState } from "react"
import { v4 as uuidv4 } from "uuid";

export default function GoalCreate({ goal, setGoal, setGoalSelected, setSteps }) {
  const [submitError, setSubmitError] = useState("");

  // populates goal with random project
  async function setRandomGoal() {


    // make a call to a random goal generator API here

    // set randomGoal to whatever API response we use to generate a random goal
    const randomGoal = "<put-random-goal-here>"

    setGoal(randomGoal);
  }

  // fires when buttons are clicked
  function handleFormSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    const btnName = e.nativeEvent.submitter.name;

    // displays a random goal
    if (btnName === "random-goal") {
      setRandomGoal();
      return;
    }

    if (goal) {

      // go to step edit page
      setGoalSelected(true);

      // have chatGPT generate steps
      if (btnName === "generate") {
        generateSteps();
      }
      // does not call chatGPT API
      else if (btnName === "no-generate") {
        setSteps([{ id: uuidv4(), title: "", description: "", completed: false }]);
      }
    }
    else

      // display error if goal field is empty
      setSubmitError("Goal cannot be blank!");
  }

  // add generated steps created by chatGPT
  async function generateSteps() {
    // make chatGPT API call here

    // chatGPT response needs to be formatted into an array of step objects, use this sample template for now
    const formattedAIResponse = [
      {
        id: uuidv4(),
        title: "placeholderTitle",
        description: "placeholderContent",
        completed: false
      },
      {
        id: uuidv4(),
        title: "placeholderTitle2",
        description: "placeholderContent2",
        completed: false
      },
      {
        id: uuidv4(),
        title: "placeholderTitle3",
        description: "placeholderContent3",
        completed: false
      },
      {
        id: uuidv4(),
        title: "placeholderTitle4",
        description: "placeholderContent4",
        completed: false
      }
    ];

    setSteps(formattedAIResponse);
  }

  // change goal text input field
  function handleInputChange(e) {
    setGoal(e.target.value);
  }

  return (
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
  )
}