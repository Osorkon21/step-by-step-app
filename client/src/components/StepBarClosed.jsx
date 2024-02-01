export default function StepBarClosed({ step, handleStepBarClick }) {
  return (
    <div className="mx-4 border-2 border-red-600 cursor-pointer" onClick={handleStepBarClick}>
      <div className="mt-3 items-center">
        {step.title || "Select to edit step"}
      </div>
    </div>
  )
}
