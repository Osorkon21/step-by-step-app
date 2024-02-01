import trashCan from "../assets/icons/trash-can.svg"


export default function StepBar({ step, currentStep, setCurrentStep }) {

  function handleStepBarClick(e) {
    if (currentStep && (step.uuid === currentStep.uuid))
      setCurrentStep(null);
    else
      setCurrentStep(step);
  }

  return (
    <div className="step">
      <div className="mx-4 ">
        <button className="mt-3 items-center" type="button" onClick={(e) => handleStepBarClick(e)}>
          {step.title}
        </button>

        {/* <img className="edit-pencil mt-3 ms-2" src={editPencil} alt="edit pencil" width="32" height="32" onClick={() => handleStepBarClick(step)} */}

        <img className="trash-can mt-3" src={trashCan} alt="trash can" width="32" height="32" onClick={() => handleDeleteStep(step._id)} />
      </div>
    </div>
  );
}
