import { LargeNavBar, SmallNavMenu, HelloUser } from './';
import Cookie from "js-cookie";

export default function Header() {
  function logout() {
    Cookie.remove("auth-cookie");
  }

  return (
    <nav className='navbar_container bg-lightestgray font-semibold sm:pt-6 fixed top-0 w-screen z-50 text-xl shadow-lg'>
      <LargeNavBar
        logout={logout}
      ></LargeNavBar>

      <SmallNavMenu
        logout={logout}
      ></SmallNavMenu>

      <HelloUser />
    </nav>
  );
}
