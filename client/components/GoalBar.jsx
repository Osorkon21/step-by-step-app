import trashCan from "../assets/icons/trash-can.svg"

export default function GoalBar({ goal, setCurrentGoal, deleteGoal }) {
  return (
    <>
      <div className="article-container mx-4 d-flex">
        <button className="btn btn-secondary mt-3 w-100 d-flex justify-content-between" onClick={() => setCurrentGoal(goal)}>
          <span>{goal.name + ` ${goal.completedStepCount}/${goal.stepsCount} steps completed`}</span>
          <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
        </button>

        <img className="trash-can mt-3 ms-2" src={trashCan} alt="trash can" width="32" height="32" onClick={() => deleteGoal(goal._id)} />
      </div>
    </>
  );
}
