import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productUpdateReducers,
  productCreateReducers,
  productReviewCreateReducers,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userDeleteReducers,
  userDetailsReducers,
  userListReducers,
  userLoginReducer,
  userRegisterReducers,
  userUpdateProfileReducers,
  userUpdateReducers,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducers,
  productUpdate: productUpdateReducers,
  productReviewCreate: productReviewCreateReducers,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
  userList: userListReducers,
  userDelete: userDeleteReducers,
  userUpdate: userUpdateReducers,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};
const initialState = {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
