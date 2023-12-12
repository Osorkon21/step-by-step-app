import { useState, useEffect } from "react"
import { parse, v4 as uuidv4 } from "uuid"


export default function GoalCreate({ goal, setGoal, setGoalSelected, steps, setSteps }) {
  const [submitError, setSubmitError] = useState("");

  // populates goal with random project
  async function setRandomGoal() {

    // make a call to a random goal generator API here

    // set randomGoal.name to whatever API response we use to generate a random goal
    const randomGoal = { name: "<put-random-goal-here>" }

    setGoal(randomGoal);
  }

  
  // fires when buttons are clicked
  function handleFormSubmit(e) {
    e.preventDefault();
    
      let aiResponse;
      let steps;
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
        
        //do the fetch call her with async
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
            console.log("This is response in GoalCreate.jsx", aiResponse); 

            const payload = aiResponse?.payload 
            if(payload.content && payload.content.length > 0){
              const firstContentItem = payload.content[0];
            
              if(firstContentItem.text && firstContentItem.text.value) {
                const textValue = JSON.parse(firstContentItem.text.value);
                const userSteps = textValue.steps       
              
                // Generate steps
                generateSteps(userSteps);
              }
            }

          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };

        // Example usage
        sendDataToServer({ userGoal: userGoal });

        // aiResponse = generateSteps(goal.name)
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
    // make chatGPT API call here
        
    // confirm it is an array and Map to format the steps
    if (Array.isArray(steps)){
      const formattedAIResponse = steps.map(function (step) { return { uuid: uuidv4(), title: step, text: "", completed: false };
    });
      setSteps(formattedAIResponse);
    } else {
      console.log("Steps is not an array or is not available yet.");
    }    
  }
    
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
