export default function StepBarOpen({ step, handleInputChange, handleStepBarClick }) {
  return (
    <div className="substep border-2 border-red-600 cursor-pointer" onClick={handleStepBarClick}>
      <div>
        <textarea className={`input ${step.uuid}`} name="title" value={step.title} placeholder="Step title" onChange={handleInputChange} />
      </div>

      <div>
        <textarea className={`input ${step.uuid}`} name="text" value={step.text} placeholder="Step description" onChange={handleInputChange} />
      </div>
    </div>
  )
}
