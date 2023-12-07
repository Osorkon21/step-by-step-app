import { useState } from 'react';
import GoalForm from './GoalForm';

function Goal(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    eagerness: '',
  });

  console.log(props.goal);

  const submitUpdate = (value) => {
    props.editGoalItem(edit.id, value);
    setEdit({ id: null, value: '', eagerness: '' });
  };

  if (edit.id) {
    return <GoalForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.goal.map((item, i) => (
    <div
      className={
        item.isComplete
          ? `goal-row complete ${item.eagerness}`
          : `goal-row ${item.eagerness}`
      }
      key={i}
    >
      <div key={item.id} onClick={() => props.completeGoalItem(item.id)}>
        {item.text}
      </div>
      <div className="icons">
        {console.log(item)}
        <p onClick={() => setEdit({ id: item.id, value: item.text, eagerness: item.eagerness })}> ✏️</p>
        <p onClick={() => props.removeGoalItem(item.id)}> 🗑️</p>
      </div>
    </div>
  ));
}

export default Goal;