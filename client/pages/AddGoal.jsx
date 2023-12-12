import { useState } from "react"
import { GoalCreate, GoalSteps } from "../components";

export default function AddGoal() {
  const [goal, setGoal] = useState({ name: "" });
  const [goalSelected, setGoalSelected] = useState(false);
  const [steps, setSteps] = useState(null);

  // clear all fields, go to goal create screen
  function reset() {
    setGoal({ name: "" });
    setGoalSelected(false);
    setSteps(null);
  }

  return (
    <>
      {/* if no goal has been submitted, display goal create form */}
      {!goalSelected ? (
        <>
          <GoalCreate
            goal={goal}
            setGoal={setGoal}
            steps={steps}
            setGoalSelected={setGoalSelected}
            setSteps={setSteps}
          ></GoalCreate>
        </>
      ) :
        // if goal has been submitted, render this
        <>
          {/* make sure steps exist before rendering */}
          {steps ? (
            <GoalSteps
              steps={steps}
              setSteps={setSteps}
              reset={reset}
              goal={goal}
              setGoal={setGoal}
              usage="createGoal"
            ></GoalSteps>
          ) : (
            // while waiting on API response, display this
            // REPLACE THIS WITH LEAH'S LOADING ANIMATION
            <div className="text-success">Loading...</div>
          )}
        </>
      }
    </>
  )
}
