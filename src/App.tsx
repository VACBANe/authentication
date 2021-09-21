import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";

import "./App.css";
import Loader from "./components/Loader/Loader";
import Login from "./components/Login";
import Me from "./components/Me";

function App() {
  const root = "123213123123123";
  // const root = "http://142.93.134.108:1111/";
  const [email, setEmail] = useState("qwerty123@reg.com");
  const [password, setPassword] = useState("qwerty123");
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();


  useEffect(() => {
    (function checkToken () {
      let tempAccess = localStorage.getItem("authAccessToken");
      let tempRefresh = localStorage.getItem("authRefreshToken");
      if (tempAccess) {
        if (isExpired(tempAccess)) {
          console.log("Token expired");
          tempRefresh && refreshToken(tempRefresh);
          checkToken();
        } else {
          console.log("Token is valid");
          history.push("/me");
        }
      } else {
        console.log("Token is empty");
        history.push("/login");
      }
    })()
  }, [])

  const regFunc = () => {
    axios
      .post(root + "sign_up", {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        if (data.message === "User was created successfully") {
          loginFunc();
        } else {
          alert("Fail");
        }
      });
  };
  const loginFunc = () => {
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
      });
  };

  const refreshToken = (token: string) => {
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

  const getBearer = (token: string) => {
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
  const logoutFunc = () => {
    localStorage.removeItem("authAccessToken");
    localStorage.removeItem("authRefreshToken");
    history.push('/login');
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
      <Route path="/me" component={Me} />
      <Route path="/me">
        <Me logoutFunc={logoutFunc} />
      </Route>
      <button onClick={() => {}}>Refresh Token</button>
      <button onClick={() => setIsLoading(false)}>Off</button>
      <button onClick={() => setIsLoading(true)}>On</button>
      {isLoading && <Loader />}
    </div>
  );
}
export default App;
