import { StepBarClosed, StepBarOpen } from "./"
import trashCan from "../assets/icons/trash-can.svg"

export default function StepBar({ step, currentStep, setCurrentStep, handleCheck, handleInputChange }) {

  function handleStepBarClick(e) {
    if (currentStep && (step.uuid === currentStep.uuid))
      setCurrentStep(null);
    else
      setCurrentStep(step);
  }

  return (

    <div className="stepbar cursor-pointer">
      <div>
        <input className={`checkbox ${step.uuid}`} type="checkbox" checked={step.completed} onChange={handleCheck} />

      </div>

      {(currentStep && (step.uuid === currentStep.uuid)) ?
        <StepBarOpen
          step={step}
          handleInputChange={handleInputChange}
          handleStepBarClick={handleStepBarClick}
        ></StepBarOpen>
        :
        <StepBarClosed
          step={step}
          handleStepBarClick={handleStepBarClick}
        ></StepBarClosed>
      }

      {/* <img className={`edit-pencil mt-3 ms-2 ${step.uuid}`} src={editPencil} alt="edit pencil" width="24" height="24" onClick={(e) => handleStepBarClick(e)} */}

      <img className={`trash-can mt-3 ms-2 ${step.uuid}`} src={trashCan} alt="trash can" width="24" height="24" onClick={(e) => handleDeleteStep(e)} />
    </div>
  );
}
