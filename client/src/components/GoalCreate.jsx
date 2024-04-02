export default function GoalCreate({ goal, setGoal, setSubmitError, getAiResponse }) {

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

  return (
    <form className="goalCreate" onSubmit={handleFormSubmit}>
      <div className="generate-goal w-full">

        <div className="gap-2 flex flex-col border-none justify-center w-full items-center">
          {/* <label className="">What is your new goal?</label> */}
          <input type="text" placeholder="Your goal, ex. Learn computer programming" className="input w-80 sm:w-96 goal-input rounded-3xl p-2 pl-4 shadow-custom focus:bg-white hover:bg-white focus:outline-none bg-lightgray focus:shadow" name="goal" value={goal.name} onChange={handleInputChange} />
          <button type="submit" className="rounded-lg w-max px-8 bg-middle p-1 shadow mt-2" name="generate">Generate Steps</button>
        </div>

        <div className="flex flex-row justify-center mt-2 gap-2">
          {/* <button className="p-1 bg-middle" name="no-generate">Add Steps manually</button> */}
          <button className="p-1 bg-middle shadow" name="random-goal">Generate Random Goal</button>
        </div>
      </div>
    </form>
  )
}
