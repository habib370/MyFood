import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [showLogInPopUp, setShowLogInPopUp] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
const [category, setCategory] = useState("all");
  const url = "https://myfood-backend-fngt.onrender.com";
  //const url="http://localhost:4000";
  const [food_list, setFoodList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  // Fetch foods with pagination
  const getFoodPage = async (pageNumber = 1) => {
    try {
      const response = await axios.get(`${url}/api/food/list?page=${pageNumber}&limit=${limit}`);
      if (response.data.ok) {
        if (pageNumber === 1) {
          setFoodList(response.data.data);
        } else {
          setFoodList((prev) => [...prev, ...response.data.data]);
        }

        // Check if there are more items
        setHasMore(pageNumber < response.data.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Load first page on mount
  useEffect(() => {
    getFoodPage(1);

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
      setUser(decoded);
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

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
   const res= await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
   console.log(res.data)
  };

  const deleteFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
    await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
  };

  const removeAllFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
    await axios.post(url + "/api/cart/deleteAll", { itemId }, { headers: { token } });
  };

  const getAllItemsFromTheCart = async (tkn) => {
    const response = await axios.get(url + "/api/cart/get", { headers: { token: tkn } });
    if (response.data.ok) setCartItems(response.data.cartData);
  };

  const fetchAllReview = async (itemId) => {
    if (!itemId) return 0;
    try {
      const res = await axios.get(`${url}/api/comment/${itemId}`);
      return res.data.ok ? res.data.comments.length : 0;
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  // Load more function
const loadMore = async () => {
  if (!hasMore) return;

  // Use functional state update to ensure correct page number
  setPage((prevPage) => {
    const nextPage = prevPage + 1;

    getFoodPage(nextPage); // fetch next page
    return nextPage;       // update page state
  });
};


  const contextValue = {
    showLogInPopUp,
    setShowLogInPopUp,
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
    fetchAllReview,
    loadMore,
    hasMore,
    setCategory,
    category
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;
