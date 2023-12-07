import { useState } from "react"

export default function AddGoal() {
  const [goal, setGoal] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault()

    if (e.nativeEvent.submitter.name === "generate") {
      // make chatGPT API call here
    }
    else {
      // do not call chatGPT API here
    }
  }

  function handleInputChange(e) {
    setGoal(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div>
            <div>
              <label className="d-block mb-1">What is your new goal?</label>
              <input type="text" name="goal" value={goal} onChange={handleInputChange} />
            </div>
          </div>
          <div className="btn-container d-flex">
            <button className="mt-2 me-2" name="generate">Generate Steps!</button>
            <button className="mt-2">I Know The Steps!</button>
          </div>
        </div>
      </form>
    </>
  )
}
