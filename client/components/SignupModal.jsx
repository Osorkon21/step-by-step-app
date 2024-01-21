import { Button, Dialog, DialogTrigger, Heading, Input, Label, Modal, TextField } from 'react-aria-components';

export default function SignupModal({ buttonText }) {
  return (
    <DialogTrigger>
      <Button>{buttonText}</Button>
      <Modal isDismissable>
        <Dialog>
          {({ close }) => (
            <form>
              <Heading slot="title">Sign up</Heading>
              <TextField autoFocus>
                <Label>First Name:</Label>
                <Input />
              </TextField>
              <TextField>
                <Label>Last Name:</Label>
                <Input />
              </TextField>
              <Button onPress={close}>
                Submit
              </Button>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}