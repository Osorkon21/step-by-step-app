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

  // clear goal currently displayed
  function reset() {
    const emptyStep = [{ uuid: uuidv4(), title: "", text: "", completed: false }];
    setCurrentGoal({ ...currentGoal, name: "", completed: false, category: null, steps: emptyStep });
  }

  async function getUserGoals() {
    const query = await fetch(`/api/users/${appCtx.user._id}`);
    const response = await query.json();
    const userGoals = response.payload.goals;
    setGoals(userGoals);
    setInProgressGoals(userGoals.filter((goal) => !goal.completed));
    setCompletedGoals(userGoals.filter((goal) => goal.completed));
  }

  // load goals from database once user id is defined
  useEffect(() => {
    if (appCtx.user?._id)
      getUserGoals()
  }, [appCtx]);

  return (
    <>
      {/* buttons at the top that switch between in progress and completed goals */}
      <DashboardHeader
        setInProgress={setInProgress}
      ></DashboardHeader>

      {/* database updates fire on save goal button click */}
      {inProgress && inProgressGoals?.length &&
        <>
          {inProgressGoals.map(goal => (
            <>
              <GoalBar
                goal={goal}
                setCurrentGoal={setCurrentGoal}
              ></GoalBar>

              {(goal.id === currentGoal._id) &&
                <GoalSteps
                  steps={currentGoal.steps}
                  setSteps={setSteps}
                  reset={reset}
                  goal={currentGoal}
                  setGoal={setCurrentGoal}
                  usage="updateGoal"
                ></GoalSteps>
              }
            </>
          ))}
        </>
      }
    </>
  );
}
