import { createContext, useEffect, useState } from "react";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils";
import { LOCALSTORAGE_TOKEN_KEY } from "../utils/constants";
import jwt from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { makeRequest } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      let user = jwt(userToken);
      setCurrentUser(user);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await makeRequest().post("/auth/login", { email, password });
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, res.data.token);
      setCurrentUser(jwt(res.data.token));
      navigate("/chats");

      toast({
        title: "Logged in successfully",
        description: "User details verified.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong!",
        description: err.response?.data?.message || "Internal server error!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const logout = () => {
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
