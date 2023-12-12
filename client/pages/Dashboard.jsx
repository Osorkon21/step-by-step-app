import { DashboardHeader, GoalBar, GoalSteps } from "../components";
import { useEffect, useState } from "react";
import { useAppCtx } from "../utils/AppProvider";

export default function Dashboard() {

  const appCtx = useAppCtx();

  // user goals from database query
  const [goals, setGoals] = useState(null);

  // put goal ids here when user clicks on a goal, put check if (goalDisplayed === goal.id) then render GoalSteps below it
  const [goalDisplayed, setGoalDisplayed] = useState("");

  // display inProgress (true) or completed (false) goals
  const [inProgress, setInProgress] = useState(true);

  async function getUserGoals() {
    const query = await fetch(`/api/users/${appCtx.user._id}`);
    const response = await query.json();
    const userGoals = response.payload.goals;
    setGoals(userGoals);
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

      {/* add dashboard components, general layout is like the dashboard in the tech-blog homework, when you click on dashboard items it would add a GoalSteps component below the selected item, database updates fire on save goal button click */}


    </>
  );
}
