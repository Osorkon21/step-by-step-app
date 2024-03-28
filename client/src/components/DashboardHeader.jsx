import { Link } from "react-aria-components";
import { CategorySelect, AddGoal } from "./"
import { useState } from "react"

export default function DashboardHeader({ categories, currentCategory, handleCategoryChange, inProgress, setInProgress, setCurrentGoal, setSubmitError }) {

  const [displayAddGoal, setDisplayAddGoal] = useState(false);

  return (
    <div className="dash-header text-center p-4 mt-4 text-purple w-full m-0">
      <div className="my-12">
        {displayAddGoal ?
          <AddGoal />
          :
          <Link className="cursor-pointer rounded-full grow h-32 w-auto p-8 shadow-md hover:shadow-custom" onPress={() => setDisplayAddGoal(true)}>➕</Link>
        }

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
