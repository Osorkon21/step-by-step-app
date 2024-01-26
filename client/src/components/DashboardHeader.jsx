import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import { useState, useEffect } from "react"

export default function DashboardHeader({ goals, setInProgress, setInProgressGoals, setCompletedGoals, setCurrentGoal, setSubmitError }) {

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

  function handleCategoryChange(e) {
    const categoryId = categories.find((category) => category.name === e.target.text).id
    const filteredGoals = goals.filter((goal) => goal.category._id === categoryId);

    setCurrentCategory(e.target.text);

    if (e.target.text !== "Show All") {
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
    <div className="dashboard-header ">
      <h1>Dashboard</h1>
      <div className="tabs">
        <button className="dashboard-tab col" type="button" onClick={() => { setCurrentGoal(null); setInProgress(true); setSubmitError(""); }}>In Progress Goals</button>
        <button className="dashboard-tab col" type="button" onClick={() => { setCurrentGoal(null); setInProgress(false); setSubmitError(""); }}>Completed Goals</button>
      </div>
      Filter by category:
      <div className="mt-1">
        <DropdownButton id="dropdown-basic-button" title={currentCategory || ""}>
          {categories?.map((category) => (
            <Dropdown.Item key={category.id} onClick={handleCategoryChange}>{category.name}</Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>
  );
}
