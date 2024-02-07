import { Dialog, DialogTrigger, OverlayArrow, Popover } from 'react-aria-components';

export default function MyPopover({ button, contents }) {

  return (
    <DialogTrigger>
      {button}
      <Popover>
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
        <Dialog>
          {contents}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
