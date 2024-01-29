export default function StepBar({ step, currentStep, setCurrentStep }) {

  function handleStepBarClick(e) {
    if (currentStep && (step.uuid === currentStep.uuid))
      setCurrentStep(null);
    else
      setCurrentStep(step);
  }

  return (
    <>
      <div className="article-container mx-4 d-flex align-items-center">
        <button className="btn btn-secondary mt-3 w-100 d-flex align-items-center" type="button" onClick={(e) => handleStepBarClick(e)}>
          {step.title}
        </button>
      </div>
    </>
  );
}
