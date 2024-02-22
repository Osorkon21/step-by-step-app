import { DashboardHeader, GoalBar, GoalSteps } from "../components";
import { useEffect, useState } from "react";
import { useAppCtx } from "../utils/AppProvider";
import { v4 as uuidv4 } from "uuid"

export default function Dashboard() {

  const appCtx = useAppCtx();

  // all user goals
  const [goals, setGoals] = useState(null);

  const [inProgressGoals, setInProgressGoals] = useState(null);
  const [completedGoals, setCompletedGoals] = useState(null);

  // goal currently displayed
  const [currentGoal, setCurrentGoal] = useState(null);

  // display inProgress (true) or completed (false) goals
  const [inProgress, setInProgress] = useState(true);

  const [submitError, setSubmitError] = useState("");

  // clear goal currently displayed
  function reset() {
    const emptyStep = [{ uuid: uuidv4(), title: "", text: "", completed: false }];
    setCurrentGoal({ ...currentGoal, name: "", completed: false, category: null, steps: emptyStep });
    setSubmitError("");
  }

  async function getUserGoals() {
    const query = await fetch(`/api/users/${appCtx.user._id}`);
    const response = await query.json();
    const userGoals = response.payload.goals;
    setGoals(userGoals);
    setInProgressGoals(userGoals.filter((goal) => !goal.completed));
    setCompletedGoals(userGoals.filter((goal) => goal.completed));
  }

  function setSteps(steps) {
    setCurrentGoal({ ...currentGoal, steps: steps });
  }

  async function deleteGoal(goalId) {
    try {
      const query = await fetch(`/api/goals/${appCtx.user._id}/${goalId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const response = await query.json();

      if (response.message === 'Goal successfully deleted')
        await getUserGoals();
      else
        throw new Error("bad response on delete goal route")
    }
    catch (err) {
      console.log(err.message);
    }
  }

  // load goals from database once user id is defined
  useEffect(() => {
    if (appCtx.user?._id) {
      getUserGoals();
    }

  }, [appCtx]);

  return (
    <div className="body mt-16">
      {/* buttons at the top that switch between in progress and completed goals */}
      <DashboardHeader
        goals={goals}
        inProgress={inProgress}
        setInProgress={setInProgress}
        setInProgressGoals={setInProgressGoals}
        setCompletedGoals={setCompletedGoals}
        setCurrentGoal={setCurrentGoal}
        setSubmitError={setSubmitError}
      ></DashboardHeader>

      {/* display in progress goals */}
      {inProgress && Boolean(inProgressGoals?.length) &&
        <>
          {inProgressGoals.map(goal => (
            <div className="goal-container" key={goal._id}>
              <GoalBar
                goal={goal}
                currentGoal={currentGoal}
                setCurrentGoal={setCurrentGoal}
                deleteGoal={deleteGoal}
                setSubmitError={setSubmitError}
              ></GoalBar>

              {(currentGoal && goal._id === currentGoal._id) &&
                <>
                  <GoalSteps
                    steps={currentGoal.steps}
                    setSteps={setSteps}
                    reset={reset}
                    goal={currentGoal}
                    setGoal={setCurrentGoal}
                    setSubmitError={setSubmitError}
                    usage="updateGoal"
                    defaultChecked={false}
                  ></GoalSteps>
                  {submitError && (<div className="text-red-600 ms-2">
                    {submitError}
                  </div>)
                  }
                </>
              }
            </div>
          ))}
        </>
      }

      {inProgress && inProgressGoals?.length === 0 &&
        <p className="mt-2">You have no goals in progress!</p>
      }

      {/* display completed goals */}
      {!inProgress && Boolean(completedGoals?.length) &&
        <>
          {completedGoals.map(goal => (
            <div className="goal-container" key={goal._id}>
              <GoalBar
                goal={goal}
                currentGoal={currentGoal}
                setCurrentGoal={setCurrentGoal}
                deleteGoal={deleteGoal}
                setSubmitError={setSubmitError}
              ></GoalBar>

              {(currentGoal && goal._id === currentGoal._id) &&
                <>
                  <GoalSteps
                    steps={currentGoal.steps}
                    setSteps={setSteps}
                    reset={reset}
                    goal={currentGoal}
                    setGoal={setCurrentGoal}
                    setSubmitError={setSubmitError}
                    usage="updateGoal"
                    defaultChecked={true}
                  ></GoalSteps>
                  {submitError && (<div className="text-red-600 ms-2">
                    {submitError}
                  </div>)
                  }
                </>
              }
            </div>
          ))}
        </>
      }

      {!inProgress && completedGoals?.length === 0 &&
        <p className="mt-2">You have no completed goals!</p>
      }
    </div>
  );
}
