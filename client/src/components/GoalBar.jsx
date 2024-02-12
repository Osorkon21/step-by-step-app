import ProgressBar from 'react-bootstrap/ProgressBar';
import { MyPopover, TrashCanButton, ConfirmDelete } from "./"

export default function GoalBar({ goal, currentGoal, setCurrentGoal, deleteGoal, setSubmitError }) {

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

  const now = Math.floor(goal.completedStepCount / goal.stepsCount * 100);

  return (
    <div className="step">
      <div className="mx-4 ">
        <div className=" flex justify-between items-center border-2 border-red-600 cursor-pointer" onClick={(e) => handleGoalBarClick(e)}>

          {(currentGoal && goal._id === currentGoal._id) ?
            <input className="goal-name-input" type="text" name="title" id="title" value={currentGoal.name} onChange={handleInputChange} />
            :
            <span>{goal.name}</span>
          }
          <ProgressBar striped variant="success" className="" now={now} label={now ? `${now}%` : ""} />
          <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
        </div>
        <MyPopover
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
