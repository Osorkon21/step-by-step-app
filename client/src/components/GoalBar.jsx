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
    <div className="">
      <div className="">
        <div className=" flex justify-between items-center gap-2 cursor-pointer" onClick={(e) => handleGoalBarClick(e)}>
          <div className='text-xl'>
            {(currentGoal && goal._id === currentGoal._id) ?
              <input className="goal-name-input shadow-inner" type="text" name="title" id="title" value={currentGoal.name} onChange={handleInputChange} />
              :
              <span>{goal.name}</span>
            }
          </div>

          <ProgressBar striped variant="success" className="" now={now} label={now ? `${now}%` : ""} />
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
    </div>
  );
}
