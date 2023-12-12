export default function GoalBar({ goal, setCurrentGoal }) {
  return (
    <>
      <div className="article-container mx-4">
        <button className="btn btn-secondary mt-3 w-100 d-flex justify-content-between" onClick={() => setCurrentGoal(goal)}>
          <span>{goal.name + ` ${goal.completedStepCount}/${goal.stepsCount} steps completed`}</span>
          <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
        </button>

        {/* add a trash can to right of button, have it delete the goal from the database on click... */}
      </div>
    </>
  );
}
