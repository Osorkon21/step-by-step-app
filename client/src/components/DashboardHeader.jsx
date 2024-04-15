import { Link } from "react-aria-components";
import { CategorySelect, AddGoal } from "./"
import { useState } from "react"
import plusSign from "../assets/icons/plus-sign.svg"

export default function DashboardHeader({ categories, currentCategory, handleCategoryChange, inProgress, setInProgress, setCurrentGoal, setSubmitError }) {

  const [displayAddGoal, setDisplayAddGoal] = useState(false);

  return (
    <div className="dashboardHeader dash-header text-center text-purple w-full flex flex-col justify-center items-center">
      <div className="mt-10 mb-8 w-full flex justify-center">
        {displayAddGoal ?
          <AddGoal />
          :
          <Link className="cursor-pointer" onPress={() => setDisplayAddGoal(true)}>
            <img className="bg-middleblur rounded-full p-6 border-2 border-transparent hover:scale-110" src={plusSign} alt="plus sign" width="80" height="80" />
          </Link>
        }

      </div>
      <div className=" flex justify-center items-center bg-middleblur gap-1 p-1 rounded-2xl">
        <button className="rounded-xl grow h-12 px-8 sm:px-12 md:px-16 max-w-xs" type="button" style={inProgress ? { backgroundColor: "var(--purple)", color: "white" } : { border: "" }} onClick={() => { setCurrentGoal(null); setInProgress(true); setSubmitError(""); }}>In Progress Goals</button>
        <button className="rounded-xl grow h-12 px-8 sm:px-12 md:px-16 max-w-xs " type="button" style={!inProgress ? { backgroundColor: "var(--purple)", color: "white" } : { border: "" }} onClick={() => { setCurrentGoal(null); setInProgress(false); setSubmitError(""); }}>Completed Goals</button>
      </div>
      <div className="mt-8">
        <h5 className="pb-1">Filter by category</h5>
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
