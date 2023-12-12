export default function GoalBar({ goal, displayGoal }) {
  return (
    <>
      <div class="article-container mx-4">
        <button className="btn btn-secondary mt-3 w-100 d-flex justify-content-between" onClick={displayGoal(goal)}>
          <span onClick={displayGoal(goal)}>{goal.title}</span>
          <span onClick={displayGoal(goal)}>{goal.createdAt.toLocaleString()}</span>
        </button>

        {/* add a trash can to right of button, have it delete the goal from the database on click... */}
      </div>
    </>
  );
}
