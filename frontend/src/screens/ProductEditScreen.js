import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productList');
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setImage(product.image);
        setPrice(product.price);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, id, successUpdate, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({ _id: id, name, image, price, brand, category, countInStock, description })
    );
  };
  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        <i className="fa-solid fa-angle-left"></i>Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="price">
              <FormLabel>Price</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="image">
              <FormLabel>Image</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="brand">
              <FormLabel>Brand</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Brand Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="countInStock">
              <FormLabel>Count In Stock</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="category">
              <FormLabel>Category</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="description">
              <FormLabel>Description</FormLabel>
              <FormControl
                as="textarea"
                placeholder="Enter Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></FormControl>
            </FormGroup>
            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
