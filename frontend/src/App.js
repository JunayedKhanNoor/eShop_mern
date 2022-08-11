import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import { Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import RequiredAuth from './ProtectRoute/RequiredAuth';
import ShippingScreen from './screens/ShippingScreen';
const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route
              path="/profile"
              element={
                <RequiredAuth>
                  <ProfileScreen />
                </RequiredAuth>
              }
            ></Route>
            <Route
              path="/shipping"
              element={
                <RequiredAuth>
                  <ShippingScreen />
                </RequiredAuth>
              }
            ></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
