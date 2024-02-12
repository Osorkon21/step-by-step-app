export default function StepBarOpen({ step, handleInputChange, handleStepBarClick }) {
  return (
    <div className="substep curent_step_open truncate flex flex-col gap-1 border-2 w-10/12 border-red-600 cursor-pointer" onClick={handleStepBarClick}>
      <div className="truncate">
        <textarea className={`${step.uuid}`} name="title" value={step.title} placeholder="Step title" onChange={handleInputChange} />
      </div>

      <div>
        <textarea className={`${step.uuid}`} name="text" value={step.text} placeholder="Step description" onChange={handleInputChange} />
      </div>
    </div>
  )
}
