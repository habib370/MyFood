import { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Cart } from './pages/Cart.jsx';
import { PlaceOrder } from './pages/PlaceOrder.jsx';
import { LoginPopup } from './components/LoginPopup.jsx';
import { Footer } from './components/Footer.jsx';

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {show && <LoginPopup setShow={setShow} />}
      <Navbar setShow={setShow} />

      <main className="flex-1 ">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
