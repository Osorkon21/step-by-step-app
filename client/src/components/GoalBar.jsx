import { MyPopover, TrashCanButton, ConfirmDelete, ProgressBar } from "./"
import downArrow from "../assets/icons/down-arrow.svg"
import rightArrow from "../assets/icons/right-arrow.svg"
import { useState, useEffect } from "react"

export default function GoalBar({ goal, categories, currentGoal, setCurrentGoal, deleteGoal, setSubmitError }) {
  const [percentComplete, setPercentComplete] = useState(Math.floor(goal.completedStepCount / goal.stepsCount * 100))

  async function handleGoalBarClick(e) {
    if (e.target.id === "title")
      return;

    if (currentGoal) {
      // remove all steps without a title
      const filteredSteps = currentGoal.steps.filter(step => step.title);

      // do not update database if required data is missing
      if (!currentGoal.name || !filteredSteps.length || !currentGoal.category) {
        console.log("currentGoal was missing a required field, did not update database")
        return;
      }

      const catToUse = categories.find((cat) => cat.name === currentGoal.category.name);

      const newGoal = {
        name: currentGoal.name,

        // if all steps are completed, goal is completed
        completed: filteredSteps.every((step) => step.completed),

        category: catToUse.id,
        steps: filteredSteps
      }

      try {
        const query = await fetch(`/api/goals/${currentGoal._id}`, {
          method: 'PUT',
          body: JSON.stringify({ goal: newGoal }),
          headers: { 'Content-Type': 'application/json' },
        });

        const response = await query.json();

        console.log(response)
        console.log(response.result)

        if (response.result === "success") {

          // refresh dashboard after creating/updating goal
          // window.location.href = "/";
          console.log("goal updated")
        }
        else {
          console.log("Database error - unable to save goal!", response);
        }
      }
      catch (err) {
        console.log(err.message)
      }

      if (goal._id === currentGoal._id)
        setCurrentGoal(null);
      else
        setCurrentGoal(goal);
    }
    else {
      setCurrentGoal(goal);
    }

    setSubmitError("");
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
            <input className="goal-name-input  w-full rounded-3xl p-2 pl-4 shadow-custom focus:bg-white hover:bg-white focus:outline-none bg-lightgray focus:shadow" type="text" name="title" id="title" placeholder="Your goal, ex. Learn computer programming" value={currentGoal.name} onChange={handleInputChange} />
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
