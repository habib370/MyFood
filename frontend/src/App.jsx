import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Cart } from "./pages/Cart.jsx";
import { PlaceOrder } from "./pages/PlaceOrder.jsx";
import { LoginPopup } from "./components/LoginPopup.jsx";
import { Footer } from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {show && <LoginPopup setShow={setShow} />}
      <Navbar setShow={setShow} />

      <main className="flex-1 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontSize: "0.8rem",
          padding: "12px 16px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3), 0 2px 5px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          minHeight: "50px",
          width: "280px",
          fontWeight: "500",
        }}
        progressStyle={{
          background: "linear-gradient(90deg, #ffd89b 0%, #19547b 100%)",
          height: "3px",
        }}
        bodyStyle={{
          margin: 0,
          padding: 0,
        }}
      />
    </div>
  );
  
}

export default App;
