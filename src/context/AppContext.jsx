import axios from "axios";

import { useEffect,createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_Backend_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  
 
   // ✅ Fetch user data using token from localStorage
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "User fetch failed");
    }
  };

  useEffect(() => {
    getUserData();
  },[]);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData
  };


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
