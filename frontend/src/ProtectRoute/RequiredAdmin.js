import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';
import Loader from '../components/Loader';

const RequiredAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  const location = useLocation();
  if (loading) {
    return <Loader></Loader>;
  }
  if (!userInfo.isAdmin) {
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequiredAdmin;
