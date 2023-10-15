import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  ListGroup,
  Card,
  Button,
  Container,
  Image,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeItemFromCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkOutHandler = async () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1 className="my-3">Shopping Cart</h1>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item className="mb-2" key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid rounded></Image>
                  </Col>
                  <Col md={3}>{item.name}</Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      className="btn-light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash></FaTrash>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) items
              </h2>
              <p>
                ${cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" onClick={() => checkOutHandler()}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
