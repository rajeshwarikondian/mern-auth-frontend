import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_Backend_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/auth/is-auth", {
        withCredentials: true,
      })
      if(data.success){
        setIsLoggedIn(true)
        getUserData(data.userId);
      //  if (data.userId)  getUserData(userId)

      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const  getUserData = async (userId) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        withCredentials:true,

        });
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
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
