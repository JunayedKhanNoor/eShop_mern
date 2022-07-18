import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);
  return (
    <div className="min-vh-100">
      <Link to="/" className="btn btn-light my-3">
        <i className="fa-solid fa-angle-left"></i>Go Back
      </Link>
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
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn btn-primary w-100"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
