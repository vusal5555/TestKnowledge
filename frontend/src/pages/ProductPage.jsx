import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Container,
  ListGroup,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useGetSingProductQuery } from "../slices/productsApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { LinkContainer } from "react-router-bootstrap";

const ProductPage = () => {
  const { id } = useParams();

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useGetSingProductQuery(id);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <>
      <Container>
        {isLoading ? (
          <Loading></Loading>
        ) : error ? (
          <Message variant="danger">{error?.data?.message}</Message>
        ) : (
          <>
            <Link to="/" className="btn btn-block">
              Go Back
            </Link>
            <Row>
              <Col md={5}>
                <Image src={product.image} fluid></Image>
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    ></Rating>
                  </ListGroup.Item>
                  <ListGroup.Item>${product.price}</ListGroup.Item>
                  <ListGroup.Item>{product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {product.countInStock ? "In stork" : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => {
                            return (
                              <option value={x + 1} key={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <LinkContainer to="/cart">
                      <Button
                        type="button"
                        disabled={!product.countInStock}
                        onClick={() => addToCartHandler()}
                      >
                        Add to Cart
                      </Button>
                    </LinkContainer>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductPage;
