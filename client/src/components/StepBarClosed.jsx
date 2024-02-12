export default function StepBarClosed({ step, handleStepBarClick }) {
  return (
    <div className="current_step_closed border-2 truncate border-red-600" onClick={handleStepBarClick}>
      <div className="items-center truncate">
        {step.title || "Select to edit step"}
      </div>
    </div>
  )
}
