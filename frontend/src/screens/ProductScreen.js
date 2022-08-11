import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  FormControl,
  FormSelect,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { id } = useParams();
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);
  const addToCartHandler = (e) => {
    e.preventDefault();
    navigate(`/cart/?id=${id}&qty=${qty}`);
  };
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        <i className="fa-solid fa-angle-left"></i>Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroupItem>
              <ListGroupItem>Price: ${product.price}</ListGroupItem>
              <ListGroupItem>Description: ${product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormSelect value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormSelect>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <Button
                    type="button"
                    className="btn btn-primary w-100"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
