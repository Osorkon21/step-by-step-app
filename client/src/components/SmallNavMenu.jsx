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
    <div className="block sm:hidden">
      <MenuTrigger>
        <Button aria-label="Menu">☰</Button>
        <Popover>
          <Menu className="flex flex-col" onAction={handleMenuAction}>
            <MenuItem id="home" href="/">Home</MenuItem>

            {appCtx.user?._id !== undefined && (
              <MenuItem id="dashboard" href="/dashboard">Dashboard</MenuItem>
            )}

            <MenuItem id="add-goal" href="/addgoal">Add Goal</MenuItem>

            {appCtx.user?._id !== undefined ? (
              <MenuItem id="logout" className="cursor-pointer">Logout</MenuItem>
            ) : (
              <MenuItem id="login-signup" className="cursor-pointer">Login</MenuItem>
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
