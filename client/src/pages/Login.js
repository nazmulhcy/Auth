import { useState } from "react";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      setEmail("");
      setPassword("");
      const data = await response.json();
      console.log(data);
      if (data.user) {
        localStorage.setItem("token", data.user);
        alert("Login Successful!");
        window.location.href = "/dashboard";
      } else {
        alert("Please check your email and your password again.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <button type="Submit" name="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
