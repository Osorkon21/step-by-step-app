export default function StepBarClosed({ step, handleStepBarClick }) {
  return (
    <div className="current_step_closed border-2 truncate flex border-red-600 " onClick={handleStepBarClick}>
      <div className="items-center truncate w-full">
        {step.title || "Select to edit step"}
      </div>
    </div>
  )
}
