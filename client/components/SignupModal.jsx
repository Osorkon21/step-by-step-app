import { Button, Dialog, DialogTrigger, Modal } from 'react-aria-components';
import { Auth } from "./"

export default function SignupModal({ usage = "login", buttonText }) {
  return (
    <DialogTrigger>
      <Button>{buttonText}</Button>
      <Modal isDismissable>
        <Dialog>
          {({ close }) => (
            <Auth
              usage={usage}
              close={close}
            ></Auth>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}