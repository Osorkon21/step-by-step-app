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


    <div className="stepbar cursor-pointer grid gap-2 items-center justify-between w-max">
      <div className="flex justify-center items-center col-span-1 w-6 h-6 self-start">
        <input className={`checkbox ${step.uuid}`} type="checkbox" checked={step.completed} onChange={handleCheck} />
      </div>

      <div className={`step-content flex justify-center items-center col-span-1 truncate ${currentStep && (step.uuid === currentStep.uuid) ? 'step-bar-open' : 'step-bar-closed'}`} onClick={handleStepBarClick}>
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


      <div className="w-6 h-6 flex justify-end items-end col-span-1 justify-items-end self-end">  <MyPopover
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
    </div>
      );
}
