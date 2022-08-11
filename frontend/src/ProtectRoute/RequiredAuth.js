import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

const RequiredAuth = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  const location = useLocation();
  if (loading) {
    return <Loader></Loader>;
  }
  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequiredAuth;
