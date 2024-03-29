import { v4 as uuidv4 } from "uuid"


export default function GoalCreate({ goal, setGoal, setGoalSelected, setSteps, setSubmitError }) {

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

    let aiResponse;
    setSubmitError("");

    const btnName = e.nativeEvent.submitter.name;

    // displays a random goal
    if (btnName === "random-goal") {
      setRandomGoal();
      return;
    }

    const userGoal = goal.name

    if (userGoal) {

      // go to step edit page
      setGoalSelected(true);

      // have chatGPT generate steps
      if (btnName === "generate") {

        // do the fetch call here with async
        const sendDataToServer = async (userGoal) => {
          try {
            const response = await fetch('/api/openai', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userGoal),
            });

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            aiResponse = await response.json()

            // Log server response
            // console.log("This is response in GoalCreate.jsx", aiResponse);

            const payload = aiResponse?.payload;

            if (payload.content && payload.content.length > 0) {
              const firstContentItem = payload.content[0];

              if (firstContentItem.text && firstContentItem.text.value) {
                var userSteps;
                var textValue;

                try {
                  textValue = JSON.parse(firstContentItem.text.value);
                  userSteps = textValue.steps
                }
                catch (err) {
                  throw new Error(firstContentItem.text.value);
                }

                if (!textValue.steps)
                  throw new Error(textValue.error);

                // Generate steps
                generateSteps(userSteps);
              }
            }

          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setSubmitError(error.message);
            setGoalSelected(false);
          }
        };

        // Example usage
        sendDataToServer({ userGoal: userGoal });

      }
      // does not call chatGPT API
      else if (btnName === "no-generate") {
        setSteps([{ uuid: uuidv4(), title: "", text: "", completed: false }]);
      }
    }
    else
      // display error if goal field is empty
      setSubmitError("Goal cannot be blank!");
  }

  // add generated steps created by chatGPT
  async function generateSteps(steps) {

    // confirm it is an array and Map to format the steps
    if (Array.isArray(steps)) {
      const formattedAIResponse = steps.map(function (step) {
        return { uuid: uuidv4(), title: step, text: "", completed: false };
      });

      setSteps(formattedAIResponse);

      // go to step edit page
      setGoalSelected(true);
    } else {
      console.log("Steps is not an array!");
      setGoalSelected(false);
      setSubmitError("I could not understand your input. Please try again with a different goal.");
    }
  }

  // change goal text input field
  function handleInputChange(e) {
    setGoal({ name: e.target.value });
  }

  return (
    <form onSubmit={handleFormSubmit}>
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
