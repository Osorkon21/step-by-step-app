import { Button } from "react-aria-components"

export default function TriggerButton({ buttonText }) {
  return (
    <Button className={`border-2 p-2 bg-middle`}>{buttonText}</Button>
  )
}
