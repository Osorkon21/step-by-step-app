import { CategorySelect } from "./"
import { useState, useEffect } from "react"

export default function DashboardHeader({ goals, inProgress, setInProgress, setInProgressGoals, setCompletedGoals, setCurrentGoal, setSubmitError }) {

  const [currentCategory, setCurrentCategory] = useState(null);
  const [categories, setCategories] = useState(null);

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
          id: "asdjiwqeauorbuaebajsdwqeesjhgfkjlfbajsdfkbl",
          name: "Show All"
        };

        const dbCategories = response.payload.map(function (category) { return { id: category._id, name: category.name } });

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
    const categoryId = categories.find((category) => category.name === categoryName).id
    const filteredGoals = goals.filter((goal) => goal.category._id === categoryId);

    setCurrentCategory(categoryName);
    setCurrentGoal(null);

    if (categoryName !== "Show All") {
      setInProgressGoals(filteredGoals.filter((goal) => !goal.completed));
      setCompletedGoals(filteredGoals.filter((goal) => goal.completed));
    }
    else {
      setInProgressGoals(goals.filter((goal) => !goal.completed));
      setCompletedGoals(goals.filter((goal) => goal.completed));
    }
  }

  useEffect(() => {
    if (!categories)
      getCategories();
  }, [categories])

  return (
    <div className="dashboard-header p-4 mt-4">
      <h1>Dashboard</h1>
      <div className="tabs flex gap-2">
        <button className="dashboard-tab col" type="button" style={inProgress ? { border: "2px solid var(--purple)" } : { border: "" }} onClick={() => { setCurrentGoal(null); setInProgress(true); setSubmitError(""); }}>In Progress Goals</button>
        <button className="dashboard-tab col" type="button" style={!inProgress ? { border: "2px solid var(--purple)" } : { border: "" }} onClick={() => { setCurrentGoal(null); setInProgress(false); setSubmitError(""); }}>Completed Goals</button>
      </div>
      <div>
        <h5 className="p-1">Filter by category</h5>
        <CategorySelect 
          category={currentCategory}
          categories={categories}
          // label={"Filter by category"}
          handleSelectionChange={handleCategoryChange}
        ></CategorySelect>
      </div>
    </div>
  );
}
