export default function StepBarOpen({ step, handleInputChange, handleStepBarClick }) {
  return (
    <div className="curent_step_open truncate flex flex-col gap-1 cursor-pointer w-full" onClick={handleStepBarClick}>
      <div className="w-full">
        <textarea className={`w-full ${step.uuid}`} name="title" value={step.title} placeholder="Step title" onChange={handleInputChange} />
      </div>

      <div className="">
        <textarea className={`w-full ${step.uuid}`} name="text" value={step.text} placeholder="Step description" onChange={handleInputChange} />
      </div>
    </div>
  )
}
