import { LargeNavBar, SmallNavMenu } from './';
import Cookie from "js-cookie";

export default function Header() {
  function logout() {
    Cookie.remove("auth-cookie");
  }

  return (
    <nav className='navbar_container bg-background text-secondaryOrange font-semibold p-6 fixed top-0 w-screen z-50 text-xl shadow-lg'>
      <LargeNavBar
        logout={logout}
      ></LargeNavBar>

      <SmallNavMenu
        logout={logout}
      ></SmallNavMenu>
    </nav>
  );
}
