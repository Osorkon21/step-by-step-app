import { Button, Menu, MenuItem, MenuTrigger, Popover } from 'react-aria-components';
import { useAppCtx } from "../utils/AppProvider"
import { SignupModal } from "./"
import { useState } from "react"

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
    <div className="flex sm:hidden justify-end items-end">
      <MenuTrigger>
        <Button className="mr-10 mt-4 py-2 px-3 border-2 bg-purple border-purple" aria-label="Menu">☰</Button>
        <Popover>
          <Menu className="flex flex-col bg-purple p-2 gap-1 rounded-lg" onAction={handleMenuAction}>
            <MenuItem className="hover:bg-purple rounded-md p-1" id="home" href="/">Home</MenuItem>

            {appCtx.user?._id !== undefined && (
              <MenuItem className="hover:bg-purple rounded-md p-1" id="dashboard" href="/dashboard">Dashboard</MenuItem>
            )}

            <MenuItem className="hover:bg-purple rounded-md p-1" id="add-goal" href="/addgoal">Add Goal</MenuItem>

            {appCtx.user?._id !== undefined ? (
              <MenuItem id="logout" className="cursor-pointer rounded-md p-1 hover:bg-purple">Logout</MenuItem>
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
