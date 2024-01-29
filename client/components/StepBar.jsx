import trashCan from "../assets/icons/trash-can.svg"

export default function StepBar({ step, currentStep, setCurrentStep, handleDeleteStep }) {

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

        {/* <img className={`edit-pencil mt-3 ms-2 ${step.uuid}`} src={editPencil} alt="edit pencil" width="24" height="24" onClick={(e) => handleStepBarClick(e)} */}

        <img className={`trash-can mt-3 ms-2 ${step.uuid}`} src={trashCan} alt="trash can" width="24" height="24" onClick={(e) => handleDeleteStep(e)} />
      </div>
    </>
  );
}
