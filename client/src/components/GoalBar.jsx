import trashCan from "../assets/icons/trash-can.svg"
import ProgressBar from 'react-bootstrap/ProgressBar';

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
    <>
      <div className="article-container mx-4 d-flex align-items-center">
        <div className="btn btn-secondary mt-3 w-100 d-flex justify-content-between align-items-center" type="button" onClick={(e) => handleGoalBarClick(e)}>

          {(currentGoal && goal._id === currentGoal._id) ?
            <>
              <input className="goal-name-input" type="text" name="title" id="title" value={currentGoal.name} onChange={handleInputChange} />
            </> :
            <span>{goal.name}</span>
          }
          <ProgressBar striped variant="success" className="w-50" now={now} label={now ? `${now}%` : ""} />
          <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
        </div>

        <img className="trash-can mt-3 ms-2" src={trashCan} alt="trash can" width="32" height="32" onClick={() => deleteGoal(goal._id)} />
      </div>
    </>
  );
}
