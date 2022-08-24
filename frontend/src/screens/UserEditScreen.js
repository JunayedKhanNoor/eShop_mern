import React, { useEffect, useState } from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userDetails);
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, user } = userRegister;
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userList');
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, id, user, successUpdate, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };
  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        <i className="fa-solid fa-angle-left"></i>Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
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
            <FormGroup controlId="email">
              <FormLabel>Email Address</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="isadmin">
              <FormCheck
                type="checkbox"
                label="IS Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></FormCheck>
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

export default UserEditScreen;
