export default function StepBarOpen({ step, handleInputChange, handleStepBarClick }) {
  return (
    <div className="substep flex flex-col gap-1 border-2 w-10/12 border-red-600" onClick={handleStepBarClick}>
      <div className="">
        <textarea className={`${step.uuid}`} name="title" value={step.title} placeholder="Step title" onChange={handleInputChange} />
      </div>

      <div>
        <textarea className={`${step.uuid}`} name="text" value={step.text} placeholder="Step description" onChange={handleInputChange} />
      </div>
    </div>
  )
}
