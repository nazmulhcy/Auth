import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

function Register() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      setName("");
      setEmail("");
      setPassword("");

      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Username"
        />
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
        <button type="submit" name="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
