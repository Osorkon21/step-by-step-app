export default function StepBar({ step, currentStep, setCurrentStep }) {

  function handleStepBarClick(e) {
    if (currentStep && (step.uuid === currentStep.uuid))
      setCurrentStep(null);
    else
      setCurrentStep(step);
  }

  return (
    <div className="stepbar cursor-pointer" onClick={(e) => handleStepBarClick(e)}>
      <div className="mx-4 ">
        <div className="mt-3 items-center">
          {step.title || "Select to edit step"}
        </div>
      </div>
    </div>
  );
}
