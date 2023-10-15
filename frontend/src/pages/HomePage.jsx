import { Row, Container, Col, Card, Button } from "react-bootstrap";
import { useGetAllProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  return (
    <>
      <Container>
        {isLoading ? (
          <Loading></Loading>
        ) : error ? (
          <Message variant="danger">{error?.data?.message}</Message>
        ) : (
          <>
            <h2>Latest Products</h2>
            <Row>
              {products.map((product) => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Card className="my-3">
                      <Link to={`/product/${product._id}`}>
                        <Card.Img src={product.image}></Card.Img>
                      </Link>

                      <Card.Body>
                        <Link to={`/product/${product._id}`}>
                          <Card.Title>{product.name}</Card.Title>
                        </Link>

                        <Card.Text>${product.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;
