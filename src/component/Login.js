import React, { useState } from "react";
import "../Login.css";
import Axios from "axios";
import { Button } from "@material-ui/core";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logoURL, setLogoURL] = useState("");

  const handleLogo = (e) => {
    console.log(e.target.value);

    setLogoURL(e.target.value);
  };

  const handleEmail = (e) => {
    console.log(e.target.value);

    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    console.log(e.target.value);

    setPassword(e.target.value);
  };

  const signin = (e) => {
    e.preventDefault();

    const user = { email: email, password: password, userImage: logoURL };
    const url = "http://localhost:9000/login";

    Axios.post(url, user).then((res) => {
      console.log("user loaded into database");
      const userData = res.data;
      console.log("Posted to Database");
      setUser(user);
    });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://i.pinimg.com/600x315/d2/32/98/d23298e8be6b9f7aa533e283228c4c2b.jpg"
          alt=""
        />

        <h1>EL Slack-Clone</h1>
        <p> kalEL-liott.slack.com </p>
        <form>
          <input
            onChange={handleEmail}
            type="email"
            placeholder="email"
            name="username"
            value={email}
          />
          <input
            onChange={handlePassword}
            type="password"
            placeholder="password"
            name="password"
            value={password}
          />
          <input
            onChange={handleLogo}
            type="text"
            placeholder="userImage"
            name="userImage"
            value={logoURL}
          />

          <Button onClick={signin}> Login </Button>
        </form>
      </div>
    </div>
  );
}
