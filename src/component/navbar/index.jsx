import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

function Navv() {
  const productItems = useSelector(
    (state) => state.productQuantity.productItems
  );
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link
                  to="/"
                  style={{ textDecorationLine: "none", color: "GrayText" }}
                >
                  Home
                </Link>
              </Nav.Link>
            </Nav>
            <Nav>
              <NavLink to="/cart">
                <Button>
                  Cart
                  <span style={{ color: "white" }}>{" "}{productItems?.length}</span>
                </Button>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export { Navv };
