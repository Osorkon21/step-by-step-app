import { StepBarClosed, StepBarOpen, MyPopover, TrashCanButton, ConfirmDelete } from "./"

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
      <div className="flex justify-center items-center w-6 h-6">
        <input className={`checkbox rounded-full ${step.uuid}`} type="checkbox" checked={step.completed} onChange={handleCheck} />
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

