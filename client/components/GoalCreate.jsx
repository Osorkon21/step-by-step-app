import { useState } from "react"
import { parse, v4 as uuidv4 } from "uuid"


export default function GoalCreate({ goal, setGoal, setGoalSelected, setSteps }) {
  const [submitError, setSubmitError] = useState("");
  let lastMessage;
  // populates goal with random project
  async function setRandomGoal() {

    // make a call to a random goal generator API here

    // set randomGoal.name to whatever API response we use to generate a random goal
    const randomGoal = { name: "<put-random-goal-here>" }

    setGoal(randomGoal);
  }
  let steps;
  let aiResponse;
  // fires when buttons are clicked
  function handleFormSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    const btnName = e.nativeEvent.submitter.name;

    // displays a random goal
    if (btnName === "random-goal") {
      setRandomGoal();
      return;
    }
    const userGoal = goal.name
    console.log(userGoal)
    if (userGoal) {

      // go to step edit page
      setGoalSelected(true);

      // have chatGPT generate steps
      if (btnName === "generate") {
        //do the fetch call her with async
        // In one of your React components

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

            aiResponse = await response.json();
            console.log("This is aiResponse in GoalCreate.jsx", aiResponse); // Log server response
            const payload = aiResponse.payload
            console.log("payload = ", payload)
            if(payload.content && payload.content.length > 0){
              const firstContentItem = payload.content[0];
              console.log("firstContentItem = ", firstContentItem)
              if(firstContentItem.text && firstContentItem.text.value) {
                const textValue = firstContentItem.text.value;
                console.log("textValue = ", textValue)
                try{
                  const parsedData = JSON.parse(textValue)
                  console.log("parsedData = ", parsedData)
                  steps = parsedData.steps;
                  console.log(steps)
                } catch (err) {
                  console.error("Error parsing JSON string: ", err)
                }
              }
            }

          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };

        // Example usage
        sendDataToServer({ userGoal: userGoal });

        generateSteps(userGoal);
        // aiResponse = generateSteps(goal.name)
        // console.log(aiResponse)
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
  async function generateSteps() {
    // make chatGPT API call here
    console.log("aiResponse = ", aiResponse)
    
    console.log("steps on  line 128", steps)
    
    const formattedAIResponse = await steps?.map(function (step) { return { uuid: uuid(), title: step, text: "", completed: false } })
    console.log("formattedAiResponse = ", formattedAIResponse)
    
    setSteps(formattedAIResponse);
  }
    
    // chatGPT response needs to be formatted into an array of step objects, use this sample template for now
    // const formattedAIResponse = [
    //   {
    //     uuid: uuidv4(),
    //     title: "placeholderTitle",
    //     text: "placeholderContent",
    //     completed: false
    //   },
    //   {
    //     uuid: uuidv4(),
    //     title: "placeholderTitle2",
    //     text: "placeholderContent2",
    //     completed: false
    //   },
    //   {
    //     uuid: uuidv4(),
    //     title: "placeholderTitle3",
    //     text: "placeholderContent3",
    //     completed: false
    //   },
    //   {
    //     uuid: uuidv4(),
    //     title: "placeholderTitle4",
    //     text: "placeholderContent4",
    //     completed: false
    //   }
    // ];


  // change goal text input field
  function handleInputChange(e) {
    setGoal({ name: e.target.value });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <div>
          <div className="d-flex">
            <label className="d-block mb-1 me-2">What is your new goal?</label>
            <input type="text" className="col-4" name="goal" value={goal.name} onChange={handleInputChange} />
            <button className="ms-4" name="random-goal">Generate Random Goal</button>
          </div>
        </div>
        <div className="btn-container d-flex">
          <button className="mt-2 me-2" name="generate">Generate Steps</button>
          <button className="mt-2" name="no-generate">I Know The Steps</button>
        </div>
      </div>
      <div className="text-danger">
        {submitError}
      </div>
    </form>
  )
}
