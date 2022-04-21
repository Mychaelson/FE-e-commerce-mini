import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import  axiosInstance  from "../configs/api";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect( async () => {
    const userToken = jsCookie.get("user_token");

    if (userToken) {
      try {
       const dataResponse = await axiosInstance.get("/user/refresh-token")
        jsCookie.set("user_token", dataResponse?.data?.token || "")
        const userData = dataResponse?.data?.result
        
        dispatch({
          type: "USER_LOGIN",
          payload: {
            username: userData.username,
            id: userData.id,
            email: userData.email
          }
        });
      
      } catch (err) {
        console.log(err)
      }
    }
  }, []);

  return children;
};

export default AuthProvider;