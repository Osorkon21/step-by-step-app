import { StepBarClosed, StepBarOpen, MyPopover, TrashCanButton, ConfirmDelete } from "./"
import downArrow from "../assets/icons/down-arrow.svg"
import rightArrow from "../assets/icons/right-arrow.svg"
import { ItemTypes } from "./Constants"
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export default function StepBar({ id, index, moveStepBar, goal, updateCurrentGoal, usage, step, steps, setSteps, currentStep, setCurrentStep, handleCheck, handleInputChange, deleteStep }) {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.STEP_BAR,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveStepBar(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.STEP_BAR,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1

  drag(drop(ref));

  function handleStepBarClick(e) {
    if (e.target.name === "title" || e.target.name === "text" || e.target.name === "explain-step")
      return;

    if (updateCurrentGoal)
      updateCurrentGoal();

    if (currentStep && (step.uuid === currentStep.uuid))
      setCurrentStep(null);
    else
      setCurrentStep(step);
  }


  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="stepBar stepbar cursor-pointer flex gap-2 items-center justify-center w-full hover:border-purple border-2 border-transparent rounded-2xl p-1"
    >

      {/* ORIGINAL CHECKBOX <div className="flex justify-center items-center w-6 h-6">
        <input className={`checkbox ${step.uuid}`} type="checkbox" checked={step.completed} onChange={handleCheck} />
      </div> */}

      {(currentStep && (step.uuid === currentStep.uuid)) ?
        <img
          className="down-arrow focus:outline-none hover:scale-150"
          src={downArrow}
          alt="caret pointing down"
          width={"24"}
          height={"24"}
          onClick={handleStepBarClick}
        />
        :
        <img
          className="right-arrow focus:outline-none hover:scale-150 w-6 h-6"
          src={rightArrow}
          alt="caret pointing right"
          width={"24"}
          height={"24"}
          onClick={handleStepBarClick}
        />
      }


      {/* CHECKBOX OVERLAY */}
      {usage === "updateGoal" &&
        <div className="flex justify-center items-center w-6 h-6">
          <input
            id={`customCheckbox-${step.uuid}`}
            className={`checkbox sr-only ${step.uuid}`}
            type="checkbox"
            checked={step.completed}
            onChange={() => handleCheck(step.uuid)} />
          <label htmlFor={`customCheckbox-${step.uuid}`} className={`block w-5 h-5 rounded-full cursor-pointer ${step.completed ? 'bg-purple' : 'bg-gray'}`}>
            {step.completed && (
              <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </label>
        </div>
      }

      <div className={`step-content flex justify-start items-center truncate grow ${currentStep && (step.uuid === currentStep.uuid) ? 'step-bar-open' : 'step-bar-closed'}`} onClick={handleStepBarClick}>
        {(currentStep && (step.uuid === currentStep.uuid)) ?
          <StepBarOpen
            goal={goal}
            step={step}
            steps={steps}
            setSteps={setSteps}
            handleInputChange={handleInputChange}
          ></StepBarOpen>
          :
          <StepBarClosed
            step={step}
          ></StepBarClosed>
        }
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

    </div>
  );
}
