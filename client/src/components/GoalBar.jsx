import { MyPopover, TrashCanButton, ConfirmDelete, ProgressBar } from "./"
import downArrow from "../assets/icons/down-arrow.svg"
import rightArrow from "../assets/icons/right-arrow.svg"
import { useState, useEffect } from "react"

export default function GoalBar({ goal, currentGoal, setCurrentGoal, deleteGoal, setSubmitError }) {
  const [percentComplete, setPercentComplete] = useState(Math.floor(goal.completedStepCount / goal.stepsCount * 100))

  function handleGoalBarClick(e) {
    if (e.target.id === "title")
      return;

    if (currentGoal && goal._id === currentGoal._id) {
      setCurrentGoal(null);
      setSubmitError("");
    }
    else {
      setCurrentGoal(goal);
      setSubmitError("");
    }
  }

  function handleInputChange(e) {
    console.log(currentGoal)
    setCurrentGoal({ ...currentGoal, name: e.target.value });
  }

  useEffect(() => {
    if (currentGoal) {
      const totalSteps = currentGoal.steps.length;
      const completedSteps = currentGoal.steps.filter((step) => step.completed === true).length;

      setPercentComplete(Math.floor(completedSteps / totalSteps * 100));
    }
    else {
      setPercentComplete(Math.floor(goal.completedStepCount / goal.stepsCount * 100))
    }
  }, [currentGoal?.steps])

  return (
    <div className=" flex flex-col md:flex-row justify-center items-center gap-2 cursor-pointer w-full" onClick={(e) => handleGoalBarClick(e)}>
      <div className="flex flex-row gap-4 w-full justify-center items-center">

        {(currentGoal && goal._id === currentGoal._id) ?
          <img
            className="right-arrow focus:outline-none hover:scale-150"
            src={rightArrow}
            alt="caret pointing right"
            width={"32"}
            height={"32"}
            onClick={handleGoalBarClick}
          />
          :
          <img
            className="down-arrow focus:outline-none hover:scale-150"
            src={downArrow}
            alt="caret pointing down"
            width={"32"}
            height={"32"}
            onClick={handleGoalBarClick}
          />
        }

        <div className='text-xl flex w-full'>
          {(currentGoal && goal._id === currentGoal._id) ?
            <input className="goal-name-input shadow-inner w-full" type="text" name="title" id="title" value={currentGoal.name} onChange={handleInputChange} />
            :
            <span>{goal.name}</span>
          }
        </div>

      </div>
      <div className="flex gap-4 items-center">
        <ProgressBar
          label={"Completed"}
          value={percentComplete}
        ></ProgressBar>

        <div>
          <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
        </div>

        <MyPopover className=""
          button={<TrashCanButton
            large={true}
          ></TrashCanButton>}
          contents={<ConfirmDelete
            target={"goal"}
            idToDel={goal._id}
            deleteFunc={deleteGoal}
          ></ConfirmDelete>}
        ></MyPopover>
      </div>
    </div>


  );
}
