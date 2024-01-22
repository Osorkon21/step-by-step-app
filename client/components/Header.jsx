import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAppCtx } from "../utils/AppProvider"
import { SignupModal } from './';
import Cookie from "js-cookie";

export default function Header() {
  const appCtx = useAppCtx();

  function logout() {
    Cookie.remove("auth-cookie");
  }

  return (
    <Navbar expand="lg" bg='dark' variant="light" className=" bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {appCtx.user?._id !== undefined && (
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            )}

            <Nav.Link href="/addgoal">Add Goal</Nav.Link>

            {appCtx.user?._id !== undefined ? (
              <button className="logout-btn" type="button" onClick={() => {
                logout();
                appCtx.updateUser();
              }}>Logout</button>
            ) : (
              <SignupModal
                buttonText={"Login"}
              ></SignupModal>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
