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

    <div className="stepbar cursor-pointer grid gap-2 items-center justify-between">
      <div className="flex justify-center items-center col-span-1 w-6 h-6">
        <input className={`checkbox ${step.uuid}`} type="checkbox" checked={step.completed} onChange={handleCheck} />
      </div>

      <div className={`step-content flex justify-center items-center col-span-1 ${currentStep && (step.uuid === currentStep.uuid) ? 'step-bar-open' : 'step-bar-closed'}`} onClick={handleStepBarClick}>
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
      </div>

      <div className="w-6 h-6 flex justify-center items-center col-span-1">
        <img className={`trash-can ${step.uuid}`} src={trashCan} alt="trash can" width="24" height="24" onClick={(e) => handleDeleteStep(e)} />
      </div>
    </div>
  );
}
