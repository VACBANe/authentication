import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";

import "./App.css";
import Loader from "./components/Loader/Loader";
import Login from "./components/Login/Login";
import Me from "./components/Me/Me";

const App: React.FC = () => {
  // const root = "123213123123123";
  const root = "http://142.93.134.108:1111/";
  const [email, setEmail] = useState<string>("qwerty123@reg.com");
  const [password, setPassword] = useState<string>("qwerty123");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let history = useHistory();
  useEffect(() => {
    let tempAccess: string | null = localStorage.getItem("authAccessToken");
    let tempRefresh: string | null = localStorage.getItem("authRefreshToken");
    if (tempAccess) {
      while (isExpired(tempAccess)) {
        tempRefresh && refreshToken(tempRefresh);
      }
      console.log("Token is valid");
      history.push("/me");
    } else {
      console.log("Token is empty");
      history.push("/login");
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regFunc: () => void = () => {
    axios
      .post(root + "sign_up", {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        data.message === "User was created successfully"
          ? loginFunc()
          : alert("Fail");
      });
  };
  const loginFunc: () => void = () => {
    setIsLoading(true);
    axios
      .post(root + `login?email=${email}&password=${password}`)
      .then(({ data }) => {
        if (data.body.access_token) {
          history.push("/me");
          localStorage.setItem("authAccessToken", data.body.access_token);
          localStorage.setItem("authRefreshToken", data.body.refresh_token);
        } else {
          alert("Fail");
        }
        setIsLoading(false);
      });
  };

  const refreshToken: (t: string) => void = (token) => {
    console.log("Refreshing token");
    axios
      .post(root + "refresh", null, {
        headers: {
          Authorization: getBearer(token),
        },
      })
      .then(({ data }) => {
        console.log("Токены получены");
        localStorage.setItem("authAccessToken", data.body.access_token);
        localStorage.setItem("authRefreshToken", data.body.refresh_token);
      });
  };

  const getBearer: (t: string) => string = (token) => {
    return `Bearer ${token}`;
  };
  const isExpired: (t: string) => boolean = (token) => {
    if (token) {
      axios
        .get(root + "me", {
          headers: {
            Authorization: getBearer(token),
          },
        })
        .then(({ data }) => {
          return data.body.message === "token expired" ? true : false;
        });
    }
    return false;
  };
  const logoutFunc: () => void = () => {
    localStorage.removeItem("authAccessToken");
    localStorage.removeItem("authRefreshToken");
    history.push("/login");
  };

  return (
    <div className="App">
      <Route path="/login">
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          regFunc={regFunc}
          loginFunc={loginFunc}
        />
      </Route>
      <Route path="/me">
        <Me logoutFunc={logoutFunc} />
      </Route>
      <div className="loader">{isLoading && <Loader />}</div>
    </div>
  );
};
export default App;
