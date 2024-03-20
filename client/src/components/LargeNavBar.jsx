import { Link } from "react-aria-components"
import { ModalWithDialogTrigger, TriggerButton, SignupModal } from "./"
import { useAppCtx } from "../utils/AppProvider"

export default function LargeNavBar({ logout }) {
  const appCtx = useAppCtx();

  return (
    <ul className='hidden sm:flex flex-row justify-center items-center'>
      <li className='px-2'>
        <Link className="nav-link text-purple hover:text-lightpurple " href="/">Home</Link>
      </li>
      <li className='px-2'>
        {appCtx.user?._id !== undefined && (
          <Link className="nav-link text-purple hover:text-lightpurple " href="/dashboard">Dashboard</Link>
        )}
      </li>
      <li className='px-2'>
        <Link className="nav-link text-purple hover:text-lightpurple " href="/addgoal">Add Goal</Link>
      </li>
      <li className="px-2">
        {appCtx.user?._id !== undefined && (
          <Link className="nav-link text-purple hover:text-lightpurple" href="/profile">Profile</Link>
        )}
      </li>
      <li className='px-2'>
        {appCtx.user?._id !== undefined ? (
          <button className="logout-btn nav-link text-purple hover:text-lightpurple hover:border-0 bg-middle px-4 py-1" onClick={() => {
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
