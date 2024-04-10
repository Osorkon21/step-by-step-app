import { Link } from "react-aria-components"
import { ModalWithDialogTrigger, TriggerButton, SignupModal } from "./"
import { useAppCtx } from "../utils/AppProvider"
import logo from "../assets/icons/logo.svg"



export default function LargeNavBar({ logout }) {
  const appCtx = useAppCtx();

  return (
    <ul className='largeNavBar hidden sm:flex flex-row justify-center items-center'>
      <Link className='flex gap-2 items-center text-purple' href='/'>
        <img src={logo} alt="logo" className="w-10 h-auto ml-8" />
        <p className='text-2xl hidden sm:block'>Upward Arc</p>
      </Link>
      <li className='px-2'>
        <Link className="nav-link text-purple hover:text-lightpurple " href="/">{appCtx.user?._id !== undefined ? "Dashboard" : "Home"}</Link>
      </li>
      <li className="px-2">
        {appCtx.user?._id !== undefined && (
          <Link className="nav-link text-purple hover:text-lightpurple" href="/profile">Profile</Link>
        )}
      </li>
      <li className='px-2'>
        {appCtx.user?._id !== undefined ? (
          <button className="logout-btn nav-link text-purple hover:text-lightpurple py-1 hover:outline-none" onClick={() => {
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
