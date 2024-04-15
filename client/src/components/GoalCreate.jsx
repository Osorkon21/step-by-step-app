import { useEffect, useRef } from "react";

export default function GoalCreate({ goal, setGoal, setSubmitError, getAiResponse }) {
  const inputRef = useRef(null);

  // populates goal with random project
  function setRandomGoal() {

    var requestRandom = `https://www.boredapi.com/api/activity/`;

    fetch(requestRandom)
      .then(function (response) {
        var resPonse = response.json();
        return resPonse
      })
      .then(function (data) {
        var randomGoal = { name: data.activity };
        setGoal(randomGoal);
      })
  }

  // fires when buttons are clicked
  function handleFormSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    // displays a random goal
    if (e.nativeEvent.submitter.name === "random-goal") {
      setRandomGoal();
      return;
    }

    getAiResponse();
  }

  // change goal text input field
  function handleInputChange(e) {
    setGoal({ name: e.target.value });
  }

  useEffect(() => {
    const textArea = inputRef.current;

    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  }, [goal.name]);

  return (
    <form className="goalCreate w-full p-2" onSubmit={handleFormSubmit}>
      <div className="generate-goal w-full">

        <div className="gap-2 flex flex-col border-none justify-center w-full items-center">
          {/* <label className="">What is your new goal?</label> */}
          <textarea ref={inputRef} rows={1} placeholder="Your goal, ex. Learn computer programming" className="input w-full goal-input max-w-3xl rounded-2xl p-2 pl-4 shadow-custom focus:bg-white hover:bg-white focus:outline-none bg-lightgray focus:shadow" name="goal" value={goal.name} onChange={handleInputChange} />
        </div>

        <div className="flex flex-row justify-center mt-2 gap-2">
          <button type="submit" className=" bg-middle p-1 px-2 sm:px-4 " name="generate">Generate Steps</button>
          <button className="p-1 px-2 sm:px-4 bg-middle" name="random-goal">Random Goal</button>
          {/* <button className="p-1 bg-middle" name="no-generate">Add Steps manually</button> */}
        </div>
      </div>
    </form>
  )
}
