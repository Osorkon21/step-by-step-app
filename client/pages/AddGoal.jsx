import { useState } from "react"
import { GoalCreate, GoalSteps } from "../components";
import '../css/AddGoal.css'
import stepImage from '../image/pic5.png'
import AiGoal from '../image/pic6.png'

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
      <img src={stepImage} className="stepImage" alt="stepImage"/>
      <body className="body">
      {/* if no goal has been submitted, display goal create form */}
      {!goalSelected ? (
        <>
          <GoalCreate
            goal={goal}
            setGoal={setGoal}
            setGoalSelected={setGoalSelected}
            setSteps={setSteps}
          ></GoalCreate>
        </>
      ) :
        // if goal has been submitted, render this
        <>
          {/* makes sure steps exist before rendering */}
          {steps ? (
            <GoalSteps
              steps={steps}
              setSteps={setSteps}
              reset={reset}
              goal={goal}
              setGoal={setGoal}
            ></GoalSteps>
          ) : (
            // while waiting on API response, display this
            // REPLACE THIS WITH LEAH'S LOADING ANIMATION
            <div className="text-success">Loading...</div>
          )}
        </>
      }
    </body>
    <div className="AiSuccess"> 
      <img src={AiGoal} className="AiGoal" alt="AiGoal"/>
    </div>
    </>
  )
}
    
  

