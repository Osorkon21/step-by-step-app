import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAppCtx } from "../utils/AppProvider"

export default function Header() {
  const { user } = useAppCtx()

  return (
    <Navbar expand="lg" bg='dark' variant="light" className=" bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {user?._id !== undefined && (
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            )}

            <Nav.Link href="/addgoal">Add Goal</Nav.Link>

            {user?._id !== undefined ? (
              <Nav.Link href="/logout">Logout</Nav.Link>
            ) : (
              <Nav.Link href="/auth">Login</Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
