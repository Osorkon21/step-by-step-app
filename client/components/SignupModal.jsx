import { Button, Dialog, DialogTrigger, Modal } from 'react-aria-components';
import { Auth } from "./"

export default function SignupModal({ buttonText, changed, setChanged }) {
  return (
    <DialogTrigger>
      <Button>{buttonText}</Button>
      <Modal isDismissable>
        <Dialog>
          {({ close }) => (
            <Auth
              usage="login"
              close={close}
              changed={changed}
              setChanged={setChanged}
            ></Auth>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}