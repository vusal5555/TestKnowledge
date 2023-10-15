import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useLogOutMutation } from "../slices/usersApiSlice";
import { unsetCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const { userInfo } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [logOut, { isLoading }] = useLogOutMutation();

  const logOutHandler = async () => {
    try {
      await logOut().unwrap();
      dispatch(unsetCredentials());
      toast.success("user logged out");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="mb-3"
      collapseOnSelect
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Shop</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-collapse"></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-collapse">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart></FaShoppingCart> Cart{" "}
                <Badge pill bg="success">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </Badge>
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name}>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={() => logOutHandler()}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser></FaUser> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
