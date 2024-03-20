import { Modal, Dialog } from "react-aria-components"
import { Auth } from "./"
import { useState } from "react"

export default function SignupModal({ isOpen = null, onOpenChange = null, setGoalStepsSubmitError = null }) {
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
    <Modal
      isDismissable
      {...(isOpen !== null ? { isOpen } : {})}
      {...(onOpenChange !== null ? { onOpenChange } : {})}
      className="signup-modal bg-middle px-6 pb-8 rounded-xl">
      <Dialog aria-label="login/signup overlay" className="focus:outline-none">
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
  )
}
