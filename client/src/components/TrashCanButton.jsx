import trashCan from "../assets/icons/trash-can.svg"
import { useButton } from "react-aria";
import { useRef } from "react";

export default function TrashCanButton(props) {
  let { children } = props;
  let ref = useRef();
  let { buttonProps, isPressed } = useButton({
    ...props,
    elementType: 'img'
  }, ref);

  return (
    <img
      {...buttonProps}
      className="trash-can"
      src={trashCan}
      alt="delete button in the form of a trash can"
      width={props.large ? "32" : "24"}
      height={props.large ? "32" : "24"}
      ref={ref}
    >
      {children}
    </img>
  );
}
