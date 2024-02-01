import trashCan from "../assets/icons/trash-can.svg"

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
        <button className="mt-3 items-center" type="button" onClick={(e) => handleStepBarClick(e)}>
          {step.title}
        </button>
      </div>
    </div>
  );
}
