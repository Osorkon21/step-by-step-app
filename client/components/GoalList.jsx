import { useState } from 'react';
import GoalForm from './GoalForm';
import Goal from './Goal';

function GoalList() {
  const [goal, setGoal] = useState([]);

  // Function to add a goal list item
  const addGoalItem = (item) => {
    console.log(
      'File: GoalList.js ~ line 10 ~ addGoalItem ~ item',
      item
    );
    // Check to see if the item text is empty
    if (!item.text) {
      return;
    }

    // Add the new goal list item to the existing array of objects
    const newGoal = [item, ...goal];
    console.log(newGoal);

    // Call setGoal to update state with our new set of goal list items
    setGoal(newGoal);
  };

  // Function to mark goal list item as complete
  const completeGoalItem = (id) => {
    // If the ID passed to this function matches the ID of the item that was clicked, mark it as complete
    let updatedGoal = goal.map((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });

    console.log(updatedGoal);
    setGoal(updatedGoal);
  };

  // Function to remove goal list item and update state
  const removeGoalItem = (id) => {
    const updatedGoal = [...goal].filter((item) => item.id !== id);

    setGoal(updatedGoal);
  };

  // Function to edit the goal list item
  const editGoalItem = (itemId, newValue) => {
    // Make sure that the value isn't empty
    if (!newValue.text) {
      return;
    }

    // We use the "prev" argument provided with the useState hook to map through our list of items
    // We then check to see if the item ID matches the if of the item that was clicked and if so we set it to a new value
    setGoal((prev) =>
      prev.map((item) => (item.id === itemId ? newValue : item))
    );
  };

  return (
    <div>
      <h1>What is on your goal list?</h1>
      <GoalForm onSubmit={addGoalItem} />
      <Goal
        goal={goal}
        completeGoalItem={completeGoalItem}
        removeGoalItem={removeGoalItem}
        editGoalItem={editGoalItem}
      ></Goal>
    </div>
  );
}

export default GoalList;
