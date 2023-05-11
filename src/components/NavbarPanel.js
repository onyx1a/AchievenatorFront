import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavbarPanel = () => {
  return(
      <>
        <Navbar bg="dark" variant="dark">
          <Container className="custom-container">
            <Navbar.Brand as={Link} to={"/"}>Achievenator</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
              <Nav.Link as={Link} to={"/about"}>About me</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
  );
};

export default NavbarPanel;