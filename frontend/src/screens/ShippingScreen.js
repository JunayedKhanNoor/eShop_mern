import React from 'react';
import { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
