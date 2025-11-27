import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const url = "https://myfood-backend-fngt.onrender.com";
   
  const[food_list,setFoodList]=useState([])

  const getAllFood=async()=>{
    const response=await axios.get(`${url}/api/food/list`);
    if(response.data.ok){
      setFoodList(response.data.data)
    }
  }
  // Load token & user from localStorage on app load
  useEffect(() => {
    getAllFood();
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);
  

  // Persist token & user whenever they change
 useEffect(() => {
  const syncData = async () => {
    if (token) {
      localStorage.setItem("token", token);
      await getAllItemsFromTheCart(token);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  syncData();
}, [token, user]);


  // Auto logout when token expires
  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp) {
        const timeLeft = decoded.exp * 1000 - Date.now();
        if (timeLeft > 0) {
          const timer = setTimeout(() => {
            setToken("");
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }, timeLeft);
          return () => clearTimeout(timer);
        } else {
          setToken("");
          setUser(null);
        }
      }
    } catch {
      setToken("");
      setUser(null);
    }
  }, [token]);

  const isLoggedIn = () => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return !(decoded.exp && decoded.exp < currentTime);
    } catch {
      return false;
    }
  };

  const addToCart =async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
  };

  const deleteFromCart = async(itemId) => {
    if (cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
  };

  const removeAllFromCart = async(itemId) => {
    if (cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
    }
   
    await axios.post(url+"/api/cart/deleteAll",{itemId},{headers:{token}})
  };
  const getAllItemsFromTheCart=async(tkn)=>{
    const response =await axios.get(url+"/api/cart/get",{headers:{token: tkn }})
   
    if(response.data.ok){
      setCartItems(response.data.cartData);
    }
  }

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    deleteFromCart,
    removeAllFromCart,
    url,
    token,
    setToken,
    isLoggedIn,
    setUser,
    user,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
