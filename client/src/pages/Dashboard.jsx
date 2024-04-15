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

  const [categories, setCategories] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [submitError, setSubmitError] = useState("");

  // clear goal currently displayed
  function reset() {
    const emptyStep = [{ uuid: uuidv4(), title: "", text: "", completed: false }];
    setCurrentGoal({ ...currentGoal, name: "", completed: false, category: null, steps: emptyStep });
    setSubmitError("");
  }

  async function saveTempGoal() {
    const response = await fetch('/api/goals', {
      method: 'POST',
      body: JSON.stringify({ goal: appCtx.tempGoal, userId: appCtx.user._id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.log(response);
      console.error("Database error - unable to save temp goal!");
    }

    appCtx.setTempGoal(null);
    getUserGoals();
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

  async function updateCurrentGoal() {
    // remove all steps without a title
    const filteredSteps = currentGoal.steps.filter(step => step.title);

    // do not update database if required data is missing
    if (!currentGoal.name || !filteredSteps.length) {
      console.log("currentGoal was missing a required field, did not update database")
      return;
    }

    const catToUse = categories.find((cat) => cat.name === currentGoal.category.name);

    const completed = filteredSteps.every((step) => step.completed);

    const newGoal = {
      name: currentGoal.name,

      // if all steps are completed, goal is completed
      completed: completed,

      // if goal is newly completed update completedTimestamp, otherwise don't change it
      completedTimestamp: (!currentGoal.completed && completed) ? new Date() : currentGoal.completedTimestamp ? currentGoal.completedTimestamp : null,

      category: catToUse.id,
      steps: filteredSteps
    }

    try {
      const query = await fetch(`/api/goals/${currentGoal._id}`, {
        method: 'PUT',
        body: JSON.stringify({ goal: newGoal }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await query.json();

      if (response.result === "success") {
        const updatedGoal = response.payload;

        const newGoals = goals.map((goal) => {
          if (goal._id === updatedGoal._id)
            return {
              ...updatedGoal,
              category: catToUse
            };

          return goal;
        })

        setGoals(newGoals);
        renderGoals(newGoals);
      }
      else {
        console.log("Database error - unable to save goal!", response);
      }
    }
    catch (err) {
      console.log(err.message)
    }
  }

  async function getCategories() {
    try {
      // get all categories
      const query = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const response = await query.json();

      if (response.result === "success!") {
        const showAll = {
          _id: "asdjiwqeauorbuaebajsdwqeesjhgfkjlfbajsdfkbl",
          name: "Show All"
        };

        const dbCategories = response.payload.map(function (category) { return { _id: category._id, name: category.name } });

        dbCategories.unshift(showAll);

        setCategories(dbCategories);
        setCurrentCategory("Show All");
      }
      else
        throw new Error("Bad response for get all Categories")
    }
    catch (err) {
      console.log(err.message);
    }
  }

  function handleCategoryChange(categoryName) {
    setCurrentCategory(categoryName);
    renderGoals(goals, categoryName);
  }

  function renderGoals(newGoals, categoryName = currentCategory) {
    if (categoryName !== "Show All") {
      const categoryId = categories.find((category) => category.name === categoryName)._id
      const filteredGoals = newGoals.filter((goal) => goal.category._id === categoryId);

      setInProgressGoals(filteredGoals.filter((goal) => !goal.completed));
      setCompletedGoals(filteredGoals.filter((goal) => goal.completed));
    }
    else {
      setInProgressGoals(newGoals.filter((goal) => !goal.completed));
      setCompletedGoals(newGoals.filter((goal) => goal.completed));
    }
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

      if (response.message === 'Goal successfully deleted') {
        if (currentGoal?._id === goalId)
          setCurrentGoal(null);

        const newGoals = goals.filter((goal) => goal._id !== goalId);
        setGoals(newGoals);
        renderGoals(newGoals);
      }
      else
        throw new Error("bad response on delete goal route")
    }
    catch (err) {
      console.log(err.message);
    }
  }

  // load goals from database once user id is defined
  // NOTE: This saves temporary goals twice in development due to Strict Mode. Obviously this violates best practices. It works in production, though, and I can't figure out a way around this right now.
  useEffect(() => {
    if (appCtx.user?._id) {
      if (appCtx.tempGoal)
        saveTempGoal();
      else
        getUserGoals();
    }
  }, [appCtx]);

  useEffect(() => {
    if (!categories)
      getCategories();
  }, [])

  return (
    <div className="dashboard body mt-16 max-w-7xl p-4">
      {/* buttons at the top that switch between in progress and completed goals */}
      <DashboardHeader
        categories={categories}
        currentCategory={currentCategory}
        handleCategoryChange={handleCategoryChange}
        inProgress={inProgress}
        setInProgress={setInProgress}
        setCurrentGoal={setCurrentGoal}
        setSubmitError={setSubmitError}
      ></DashboardHeader>

      {/* display in progress goals */}
      {inProgress && Boolean(inProgressGoals?.length) &&
        <>
          {inProgressGoals.map(goal => (
            <div className="goal-container shadow-lg" key={goal._id}>
              <GoalBar
                goal={goal}
                currentGoal={currentGoal}
                setCurrentGoal={setCurrentGoal}
                updateCurrentGoal={updateCurrentGoal}
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
                    updateCurrentGoal={updateCurrentGoal}
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
        <p className="mt-2">You have no {currentCategory === "Show All" ? "" : currentCategory} goals in progress!</p>
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
                updateCurrentGoal={updateCurrentGoal}
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
                    updateCurrentGoal={updateCurrentGoal}
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
        <p className="mt-2">You have no completed {currentCategory === "Show All" ? "" : currentCategory} goals!</p>
      }
    </div>
  );
}
