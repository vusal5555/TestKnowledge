import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import { Form, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const { shippingAddress } = useSelector((store) => store.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>

      <Form onSubmit={submitHandler}>
        <h1>Payment</h1>
        <Col>
          <Form.Group>
            <h5>Select Method</h5>
            <Form.Check
              as="input"
              type="radio"
              label="PayPal Or Credit Card"
              name="paymentMethod"
              value="PayPal"
              id="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Form.Group>
          <Button type="submit" className="my-2">
            Continue
          </Button>
        </Col>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
