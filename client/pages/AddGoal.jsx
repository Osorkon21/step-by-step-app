import { useState, useEffect } from "react"

export default function AddGoal() {
  const [goal, setGoal] = useState("");
  const [goalSelected, setGoalSelected] = useState(false);
  const [steps, setSteps] = useState([{ title: "", description: "" }]);

  async function handleFormSubmit(e) {
    e.preventDefault()

    setGoalSelected(true);

    if (e.nativeEvent.submitter.name === "generate") {
      // make chatGPT API call here

      // chatGPT response needs to be formatted into an array of step objects
      const aiResponse = [{
        title: "placeholderTitle",
        description: "placeholderContent"
      }];
      setSteps(aiResponse);
    }
    else {
      // do not call chatGPT API here
    }
  }

  function handleInputChange(e) {
    setGoal(e.target.value);
  }

  // re-render page when goalSelected changes
  useEffect(() => {
    console.log("goalSelected has changed. Value: " + goalSelected);
  }, [goalSelected]);

  //re-render page when steps is populated by chatGPT
  useEffect(() => {
    console.log("steps has changed. Value:", steps);
  }, [steps]);

  return (
    <>
      {!goalSelected ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <div>
              <div className="d-flex">
                <label className="d-block mb-1">What is your new goal?</label>
                <input type="text" name="goal" value={goal} onChange={handleInputChange} />
                <button className="ms-2">Generate Random Goal</button>
              </div>
            </div>
            <div className="btn-container d-flex">
              <button className="mt-2 me-2" name="generate">Generate Steps!</button>
              <button className="mt-2">I Know The Steps!</button>
            </div>
          </div>
        </form>
      ) : (
          
      )}

    </>
  )
}
