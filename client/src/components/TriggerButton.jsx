import { Button } from "react-aria-components"
import { useAppCtx } from "../utils/AppProvider"

export default function TriggerButton({ buttonText, goal, categories }) {

  const appCtx = useAppCtx();

  function handleButtonPress() {
    if (buttonText !== "Sign up to save goal!") {
      appCtx.setTempGoal(null);
      return;
    }

    const catToUse = categories.find((cat) => cat.name === goal.category);
    goal.category = catToUse._id;
    appCtx.setTempGoal(goal);
  }

  return (
    <Button className={`border-2 p-2 bg-middle`} onPress={handleButtonPress}>{buttonText}</Button>
  )
}
