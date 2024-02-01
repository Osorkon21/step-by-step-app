export default function StepBar({ step, currentStep, setCurrentStep }) {

  function handleStepBarClick(e) {
    if (currentStep && (step.uuid === currentStep.uuid))
      setCurrentStep(null);
    else
      setCurrentStep(step);
  }

  return (
    <div className="stepbar">
      <div className="mx-4 ">
        <button className="mt-3 items-center" type="button">
          {step.title}
        </button>
      </div>
    </div>
  );
}
