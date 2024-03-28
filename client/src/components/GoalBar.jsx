import { MyPopover, TrashCanButton, ConfirmDelete, ProgressBar } from "./"
import downArrow from "../assets/icons/down-arrow.svg"
import rightArrow from "../assets/icons/right-arrow.svg"
import { useState, useEffect } from "react"

export default function GoalBar({ goal, currentGoal, setCurrentGoal, deleteGoal, setSubmitError }) {
  const [percentComplete, setPercentComplete] = useState(Math.floor(goal.completedStepCount / goal.stepsCount * 100))
  const [timestamp, setTimestamp] = useState('')

  const calculateTimestamp = () => {
    let currentTime = new Date();
    let createdTime = new Date(goal.createdAt);
    let timeDifference = currentTime.getTime() - createdTime.getTime();
    let secondsDifference = Math.floor(timeDifference / 1000);

    console.log("Created At:", goal.createdAt);
    console.log("Current Time:", currentTime);
    console.log("Calculated Timestamp:", secondsDifference);

    if (secondsDifference < 60) {
      setTimestamp('Just now')
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      setTimestamp(`${minutes} minute${minutes !== 1 ? 's' : ''} ago`);
    } else if (secondsDifference < 86400) {
      const hours = Math.floor(secondsDifference / 3600);
      setTimestamp(`${hours} hour${hours !== 1 ? 's' : ''} ago`);
    } else if (secondsDifference < 172800) {
      setTimestamp('Yesterday')
    } else if (secondsDifference < 2592000) {
      const days = Math.floor(secondsDifference / 86400);
      setTimestamp(`${days} day${days !== 1 ? 's' : ''} ago`);
    } else {
      setTimestamp(createdTime.toLocaleDateString());
    }
  };

  useEffect(() => {
    calculateTimestamp()

    // Update the timestamp every minute
    const interval = setInterval(() => {
      calculateTimestamp()
    }, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [goal.createdAt]);


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
            className="down-arrow focus:outline-none hover:scale-150"
            src={downArrow}
            alt="caret pointing down"
            width={"32"}
            height={"32"}
            onClick={handleGoalBarClick}
          />
          :
          <img
            className="right-arrow focus:outline-none hover:scale-150"
            src={rightArrow}
            alt="caret pointing right"
            width={"32"}
            height={"32"}
            onClick={handleGoalBarClick}
          />
        }

        <div className='text-xl flex w-full'>
          {(currentGoal && goal._id === currentGoal._id) ?
            <input className="goal-name-input  w-full rounded-3xl p-2 pl-4 shadow-custom focus:bg-white hover:bg-white focus:outline-none bg-lightgray focus:shadow" type="text" name="title" id="title" value={currentGoal.name} onChange={handleInputChange} />
            :
            <span>{goal.name}</span>
          }
        </div>

      </div>
      <div className="flex gap-4 items-center">
        <ProgressBar
          label={"Completed"}
          value={(currentGoal && goal._id === currentGoal._id) ? percentComplete : Math.floor(goal.completedStepCount / goal.stepsCount * 100)}
        ></ProgressBar>

        <div>
          <span>{timestamp}</span>
        </div>

        {/* Last edited at {new Date(goal.createdAt).toLocaleTimeString()} */}

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
