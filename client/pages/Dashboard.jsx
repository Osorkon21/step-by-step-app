import { DashboardHeader, GoalBar, GoalSteps } from "../components";
import { useEffect, useState } from "react";
import { useAppCtx } from "../utils/AppProvider";
import { v4 as uuidv4 } from "uuid"

export default function Dashboard() {

  const appCtx = useAppCtx();

  // all user goals
  const [goals, setGoals] = useState(null);

  // goal currently displayed
  const [goal, setGoal] = useState(null);

  // steps of goal currently displayed
  const [steps, setSteps] = useState(null);

  const [inProgressGoals, setInProgressGoals] = useState(null);
  const [completedGoals, setCompletedGoals] = useState(null);

  // id of goal currently displayed
  const [goalDisplayed, setGoalDisplayed] = useState("");

  // display inProgress (true) or completed (false) goals
  const [inProgress, setInProgress] = useState(true);

  // title: {
  //   type: String,
  //     required: true,
  //   },
  // text: {
  //   type: String
  // },
  // completed: {
  //   type: Boolean,
  //     required: true
  // },
  // uuid: {
  //   type: String,
  //     required: true
  // }

  // clear goal currently displayed
  function reset() {
    const emptyStep = [{ uuid: uuidv4(), title: "", text: "", completed: false }];

    setSteps(emptyStep);
    setGoal({ ...goal, name: "", completed: false, category: null, steps: emptyStep });
  }

  async function getUserGoals() {
    const query = await fetch(`/api/users/${appCtx.user._id}`);
    const response = await query.json();
    const userGoals = response.payload.goals;
    setGoals(userGoals);
    setInProgressGoals(userGoals.filter((goal) => !goal.completed));
    setCompletedGoals(userGoals.filter((goal) => goal.completed));
  }

  function displayGoal(goal) {
    setGoal(goal);
    setSteps(goal.steps);
    setGoalDisplayed(goal._id);
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
      {inProgress && inProgressGoals?.length &&
        <>
          {inProgressGoals.map(goal => (
            <>
              <GoalBar
                goal={goal}
                displayGoal={displayGoal}
              ></GoalBar>

              {(goal.id === goalDisplayed) &&
                <GoalSteps
                  steps={goal.steps}
                  setSteps={setSteps}
                  reset={reset}
                  goal={goal}
                  setGoal={setGoal}
                  usage="updateGoal"
                ></GoalSteps>
              }
            </>
          ))}
        </>
      }


      {steps.map(item => (
        <div key={item.uuid} >
          <div className="d-flex align-items-center">
            <div className="form-group">
              <label htmlFor={item.uuid}>Completed:</label>
              <input className="checkbox" type="checkbox" checked={item.completed} id={item.uuid} onChange={handleCheck} />
            </div>
            <div className="form-group col-6">
              <label htmlFor={item.uuid}>Step Title:</label>
              <input className="form-control" name="title" type="text" value={item.title} id={item.uuid} onChange={handleInputChange} />
            </div>
            <button type="button" className="ms-2" id={item.uuid} onClick={handleDeleteStep}>Delete Step</button>
          </div>

          <div>
            <div className="form-group col-6">
              <label htmlFor={item.uuid}>Description:</label>
              <input className="form-control" name="text" type="text" value={item.text} id={item.uuid} onChange={handleInputChange} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
