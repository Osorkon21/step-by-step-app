import { GoalBar } from "../components";
import { useEffect, useState } from "react";
import { useAppCtx } from "../utils/AppProvider";

export default function Dashboard() {

  const appCtx = useAppCtx();

  const [goals, setGoals] = useState(null);

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
      {/* add buttons at top(another navbar ?) that would switch between inProgress and Completed goals, database updates fire on save goal button click */}


      {/* add dashboard components, general layout is like the dashboard in the tech-blog homework, when you click on dashboard items it would add a GoalSteps component below the selected item */}


    </>
  );
}
