import { Link } from "react-aria-components";
import { CategorySelect, AddGoal } from "./"
import { useState } from "react"
import plusSign from "../assets/icons/plus-sign.svg"

export default function DashboardHeader({ categories, currentCategory, handleCategoryChange, inProgress, setInProgress, setCurrentGoal, setSubmitError }) {

  const [displayAddGoal, setDisplayAddGoal] = useState(false);

  return (
    <div className="dashboardHeader dash-header text-center mt-8 text-purple w-full flex flex-col justify-center items-center">
      <div className="my-12 w-full flex justify-center">
        {displayAddGoal ?
          <AddGoal />
          :
          <Link className="cursor-pointer" onPress={() => setDisplayAddGoal(true)}>
            <img className="bg-middle rounded-full p-4 border-2 border-transparent hover:border-purple" src={plusSign} alt="plus sign" width="96" height="96" />
          </Link>
        }

      </div>
      <div className=" flex justify-center items-center gap-2">
        <button className="shadow-custom rounded-2xl grow h-12 px-2 max-w-xs" type="button" style={inProgress ? { border: "2px solid var(--purple)" } : { border: "" }} onClick={() => { setCurrentGoal(null); setInProgress(true); setSubmitError(""); }}>In Progress Goals</button>
        <button className="shadow-custom rounded-2xl grow h-12 px-2 max-w-xs " type="button" style={!inProgress ? { border: "2px solid var(--purple)" } : { border: "" }} onClick={() => { setCurrentGoal(null); setInProgress(false); setSubmitError(""); }}>Completed Goals</button>
      </div>
      <div className="mt-12">
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
