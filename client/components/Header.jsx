import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from "react"
import { useAppCtx } from "../utils/AppProvider"
import { SignupModal } from './';

export default function Header() {
  const appCtx = useAppCtx();

  const [changed, setChanged] = useState(false);

  useEffect(() => {
    appCtx.verifyUser();
  }, [changed])

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
              <Nav.Link href="/logout">Logout</Nav.Link>
            ) : (
              <SignupModal
                buttonText={"Login"}
                changed={changed}
                setChanged={setChanged}
              ></SignupModal>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
