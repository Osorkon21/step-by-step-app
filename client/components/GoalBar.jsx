import trashCan from "../assets/icons/trash-can.svg"
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function GoalBar({ goal, setCurrentGoal, deleteGoal }) {

  function handleBarClick(goal) {

  }

  const now = Math.floor(goal.completedStepCount / goal.stepsCount * 100);

  return (
    <>
      <div className="article-container mx-4 d-flex">
        <button className="btn btn-secondary mt-3 w-100 d-flex justify-content-between align-items-center" type="button" onClick={() => handleBarClick(goal)}>
          <span>{goal.name}</span>
          <ProgressBar striped variant="success" className="w-50" now={now} label={now ? `${now}%` : ""} />
          <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
        </button>

        <img className="trash-can mt-3 ms-2" src={trashCan} alt="trash can" width="32" height="32" onClick={() => deleteGoal(goal._id)} />
      </div>
    </>
  );
}
