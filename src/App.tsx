import axios from "axios";
import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import "./App.css";
import Me from "./components/Me";

function App() {
  const root = "http://142.93.134.108:1111/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let token: string;
  let history = useHistory();

  const regFunc = () => {
    axios
      .post(root + "sign_up", {
        email: email,
        password: password,
      })
      .then((result) => console.log(result.data.message));
  };
  const loginFunc = () => {
    axios
      .post(root + `login?email=${email}&password=${password}`)
      .then(({ data }) => {
        if (data.body.access_token) {
          history.push("/me");
          token = data.body.access_token;
        } else {
          alert("Fail");
        }
      });
  };
  const getFunc = () => {
    axios
      .get(root + "me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const refreshFunc = () => {};

  return (
    <div className="App">
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={regFunc}>Register</button>
      <button onClick={loginFunc}>Login</button>
      <button onClick={getFunc}>Get token</button>
      <button onClick={refreshFunc}>Refresh Token</button>
      <button onClick={() => console.log(history)}>test button</button>
      <Route path="/me" component={Me} />
    </div>
  );
}
export default App;
