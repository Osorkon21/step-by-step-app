import { useRef, useEffect } from "react"

export default function StepBarOpen({ step, handleInputChange, handleStepBarClick }) {
  // function useOutsideAlerter(ref) {
  //   useEffect(() => {
  //     function handleClickOutside(event) {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //         handleStepBarClick();
  //       }
  //     }
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [ref]);
  // }

  // const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);

  // return <div ref={wrapperRef}>
  //   <div className="curent_step_open truncate flex flex-col gap-1 cursor-pointer w-full" onClick={handleStepBarClick}>
  //     <div className="w-full">
  //       <textarea data-uuid={step.uuid} className={`w-full shadow-inner`} name="title" value={step.title} placeholder="Step title" onChange={handleInputChange} />
  //     </div>

  //     <div className="">
  //       <textarea data-uuid={step.uuid} className={`w-full shadow-inner`} name="text" value={step.text} placeholder="Step description" onChange={handleInputChange} />
  //     </div>
  //   </div>
  // </div>

  // function handleClickOutside(e) {
  //   e.preventDefault();
  //   console.log("HI")
  //   handleStepBarClick(e);
  // }

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [])

  return (
    <div className="curent_step_open truncate flex flex-col gap-1 cursor-pointer w-full" onClick={handleStepBarClick}>
      <div className="w-full">
        <textarea data-uuid={step.uuid} className={`w-full shadow-inner`} name="title" value={step.title} placeholder="Step title" onChange={handleInputChange} />
      </div>

      <div className="">
        <textarea data-uuid={step.uuid} className={`w-full shadow-inner`} name="text" value={step.text} placeholder="Step description" onChange={handleInputChange} />
      </div>
    </div>
  )
}
