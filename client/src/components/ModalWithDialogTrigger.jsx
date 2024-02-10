import { DialogTrigger } from 'react-aria-components';

export default function ModalWithDialogTrigger({ trigger, modal }) {
  return (
    <DialogTrigger>
      {trigger}
      {modal}
    </DialogTrigger>
  );
}
