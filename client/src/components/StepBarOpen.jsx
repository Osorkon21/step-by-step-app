import { v4 as uuidv4 } from "uuid"

export default function StepBarOpen({ step, handleInputChange, handleStepBarClick }) {
  return (
    <div className="curent_step_open truncate flex flex-col gap-1 cursor-pointer w-full" onClick={handleStepBarClick}>
      <div className="w-full">
        <textarea data-uuid={step.uuid} className={`w-full shadow-inner`} name="title" value={step.title} placeholder="Step title" onChange={handleInputChange} />
      </div>

      <div className="">
        <textarea data-uuid={step.uuid} className={`w-full shadow-inner`} name="text" value={step.text} placeholder="Step description" onChange={handleInputChange} />
      </div>
    </div>
  )
}
