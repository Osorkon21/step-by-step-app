import { Button, Dialog, DialogTrigger, Modal } from 'react-aria-components';
import { Auth } from "./"
import { useState } from "react";

export default function SignupModal({ buttonText, setGoalStepsSubmitError = null }) {
  const [usage, setUsage] = useState("login");

  const signupStyle = {
    textDecoration: "underline blue",
    color: "blue",
    cursor: "pointer"
  };

  function flipUsage() {
    if (usage === "login")
      setUsage("signup");
    else if (usage === "signup")
      setUsage("login");
  }

  return (
    <DialogTrigger>
      <Button>{buttonText}</Button>
      <Modal isDismissable>
        <Dialog>
          {({ close }) => (
            <>
              <Auth
                usage={usage}
                close={close}
                setGoalStepsSubmitError={setGoalStepsSubmitError}
              ></Auth>
              <p>{usage === "login" ? "No account? " : "Back to "}<span style={signupStyle} onClick={() => flipUsage()}>{usage === "login" ? "Sign up!" : "Login"}</span></p>
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}
