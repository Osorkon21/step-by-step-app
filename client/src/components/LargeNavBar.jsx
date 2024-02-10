import { Link } from "react-aria-components"
import { ModalWithDialogTrigger, TriggerButton, SignupModal } from "./"
import { useAppCtx } from "../utils/AppProvider"

export default function LargeNavBar({ logout }) {
  const appCtx = useAppCtx();

  return (
    <ul className='hidden sm:flex flex-row justify-center'>
      <li className='px-2'>
        <Link className="nav-link p-2 hover:text-accent active:shadow-inner" href="/">Home</Link>
      </li>
      <li className='px-2'>
        {appCtx.user?._id !== undefined && (
          <Link className="nav-link p-2 hover:text-accent active:shadow-inner" href="/dashboard">Dashboard</Link>
        )}
      </li>
      <li className='px-2'>
        <Link className="nav-link p-2 hover:text-accent active:shadow-inner" href="/addgoal">Add Goal</Link>
      </li>
      <li className='px-2'>
        {appCtx.user?._id !== undefined ? (
          <button className="logout-btn nav-link p-2 hover:text-accent active:shadow-inner" onClick={() => {
            logout();
            appCtx.updateUser();
          }}>Logout</button>
        ) : (
          <ModalWithDialogTrigger
            trigger={<TriggerButton
              buttonText={"Login"}
            ></TriggerButton>}
            modal={<SignupModal />}
          ></ModalWithDialogTrigger>
        )}
      </li>
    </ul>
  )
}
