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

    <div className="stepbar">
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

      <MyPopover
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
  );
}
