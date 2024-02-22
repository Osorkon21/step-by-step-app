import { StepBarClosed, StepBarOpen, MyPopover, TrashCanButton, ConfirmDelete } from "./"
import { v4 as uuidv4 } from "uuid"
export default function StepBar({ step, currentStep, setCurrentStep, handleCheck, handleInputChange, deleteStep }) {

  function handleStepBarClick(e) {
    if (e.target.name === "title" || e.target.name === "text")
      return;

    if (currentStep && (step.uuid === currentStep.uuid))
      setCurrentStep(null);
    else
      setCurrentStep(step);
  }

  return (


    <div className="stepbar cursor-pointer flex gap-2 items-center justify-center w-full">

      {/* ORIGINAL CHECKBOX <div className="flex justify-center items-center w-6 h-6">
        <input className={`checkbox ${step.uuid}`} type="checkbox" checked={step.completed} onChange={handleCheck} />
      </div> */}

      {/* CHECKBOX OVERLAY */}
      <div className="flex justify-center items-center w-6 h-6">
        <input 
        id={`customCheckbox-${step.uuid}`} 
        className={`checkbox sr-only ${step.uuid}`} 
        type="checkbox" 
        checked={step.completed} 
        onChange={() => handleCheck(step.uuid)} />
        <label htmlFor={`customCheckbox-${step.uuid}`} className={`block w-5 h-5 rounded-full cursor-pointer ${step.completed ? 'bg-purple' : 'bg-white'}`}>
          {step.completed && (
            <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </label>
      </div>

  


      <div className="w-6 h-6 flex justify-center items-center shrink-0">  <MyPopover
        button={<TrashCanButton
          large={false}
        ></TrashCanButton>}
        contents={<ConfirmDelete
          target={"step"}
          idToDel={step.uuid}
          deleteFunc={deleteStep}
        ></ConfirmDelete>}
      ></MyPopover>
      </div>

      <div className={`step-content flex justify-start items-center truncate grow ${currentStep && (step.uuid === currentStep.uuid) ? 'step-bar-open' : 'step-bar-closed'}`} onClick={handleStepBarClick}>
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


    </div>
  );
}


// max-w-xs md:max-w-2xl lg:max-w-4xl 

