import { Button, Menu, MenuItem, MenuTrigger, Popover } from 'react-aria-components';
import { useAppCtx } from "../utils/AppProvider"
import { SignupModal } from "./"
import { useState } from "react"
import logo from "../assets/icons/logo.svg"
import { Link } from "react-aria-components"


export default function SmallNavMenu({ logout }) {
  const appCtx = useAppCtx();

  const [isOpen, setOpen] = useState(false);

  function handleMenuAction(key) {
    if (key === "logout") {
      logout();
      appCtx.updateUser();
    }
    else if (key === "login-signup")
      setOpen(true);
  }

  return (
    <div className="smallNavMenu flex sm:hidden justify-between">
      <Link className='flex gap-2 items-center text-purple' href='/'>
        <img src={logo} alt="logo" className="w-10 h-auto ml-8" />
        <p className='text-2xl hidden sm:block'>Upward Arc</p>
      </Link>

      <MenuTrigger>
        <Button className="mr-10 my-4 py-2 px-3 border-2 bg-purple border-purple text-white" aria-label="Menu">☰</Button>
        <Popover>
          <Menu className="flex flex-col bg-middle p-2 gap-1 rounded-lg" onAction={handleMenuAction}>
            <MenuItem className="cursor-pointer hover:bg-purple hover:text-white rounded-md p-1" id="home" href="/">{appCtx.user?._id !== undefined ? "Dashboard" : "Home"}</MenuItem>

            {appCtx.user?._id !== undefined ? (
              <>
                <MenuItem className="cursor-pointer rounded-md p-1 hover:bg-purple hover:text-white" id="profile" href="/profile">Profile</MenuItem>
                <MenuItem id="logout" className="cursor-pointer rounded-md p-1 hover:bg-purple hover:text-white">Logout</MenuItem>
              </>
            ) : (
              <MenuItem id="login-signup" className="cursor-pointer rounded-md p-1 hover:bg-purple">Login</MenuItem>
            )}
          </Menu>
        </Popover>
      </MenuTrigger>

      <SignupModal
        isOpen={isOpen}
        onOpenChange={setOpen}
      ></SignupModal>
    </div>

  )
}
