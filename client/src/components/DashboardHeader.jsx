import { Link } from "react-aria-components";
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
    <div className="text-center p-4 mt-4 text-purple">
      <h1 className="text-5xl md:text-6xl my-8">Dashboard</h1>
      <div className="my-12">
        <Link href="/addgoal" className="rounded-full grow h-32 w-auto p-8 shadow-md hover:shadow-custom">➕</Link>
      </div>
      <div className=" flex justify-center gap-2">
        <button className="shadow-custom rounded-full grow h-12 px-2" type="button" style={inProgress ? { border: "2px solid var(--purple)" } : { border: "" }} onClick={() => { setCurrentGoal(null); setInProgress(true); setSubmitError(""); }}>In Progress Goals</button>
        <button className="shadow-custom rounded-full grow h-12 px-2" type="button" style={!inProgress ? { border: "2px solid var(--purple)" } : { border: "" }} onClick={() => { setCurrentGoal(null); setInProgress(false); setSubmitError(""); }}>Completed Goals</button>
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
