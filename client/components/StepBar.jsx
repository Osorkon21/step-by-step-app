import trashCan from "../assets/icons/trash-can.svg"

export default function StepBar({ step, currentStep, setCurrentStep, deleteStep }) {

  function handleStepBarClick(step) {
    if (currentStep && step._id === currentStep._id)
      setCurrentStep(null);
    else
      setCurrentStep(step);
  }

  return (
    <>
      <div className="article-container mx-4 d-flex">
        <button className="btn btn-secondary mt-3 w-100 d-flex align-items-center" type="button" onClick={() => handleStepBarClick(step)}>
          {step.name}
        </button>

        {/* <img className="edit-pencil mt-3 ms-2" src={editPencil} alt="edit pencil" width="32" height="32" onClick={() => handleStepBarClick(step)} */}

        <img className="trash-can mt-3 ms-2" src={trashCan} alt="trash can" width="32" height="32" onClick={() => deleteStep(step._id)} />
      </div>
    </>
  );
}
