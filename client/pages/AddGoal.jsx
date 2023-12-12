import { useState } from "react"
import { GoalCreate, GoalSteps } from "../components";
import stepImage from '../image/pic5.png'
import assistStep from '../image/pic6.png'
import stepAi from '../image/pic7.png'

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
      <img src={assistStep} className="assistStep" alt="assistStep" />
      <img src={stepAi} className="stepAi" alt="Ai" />
      <img src={stepImage} className="stepImage" alt="stepImage" />
      <p className="paragraphStep">In order to achieve your goal you can't just take one huge step and
        expect to get there. One step at a time is the key to achieving one's
        goal and one step at a time is also another crucial aspect that we
        are willingly to help out with. Start generating goals below and an all-knowing AI will assist
        with the process.
      </p>
      <div className="body">
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
                usage="createGoal"
              ></GoalSteps>
            ) : (
              // while waiting on API response, display this
              // below code generated by https://loading.io/
              <div class="loadingio-spinner-bean-eater-zwyhx5ec3yq"><div class="ldio-wa7k0r94wz9">
                <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
              </div></div>
            )}
          </>
        }
      </div>
    </>
  )
}



