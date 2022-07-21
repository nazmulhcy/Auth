import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./style.css";

const Dashboard = () => {
  const history = useHistory();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  async function populateQuote() {
    const response = await fetch("http://localhost:1377/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    var data = await response.json();
    console.log(data);
    data = JSON.parse(data);
    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        history.replace("/login");
      } else {
        populateQuote();
      }
    }
  }, []);

  // async function updateQuote(event) {
  // 	event.preventDefault()

  // 	const response = await fetch('http://localhost:1377/api/quote', {
  // 		method: 'POST',
  // 		headers: {
  // 			'Content-Type': 'application/json',
  // 			'x-access-token': localStorage.getItem('token'),
  // 		},
  // 		body: JSON.stringify({
  // 			quote: tempQuote,
  // 		}),
  // 	})

  // 	var data = await response.json()
  //     data = JSON.parse(data)
  // 	if (data.status === 'ok') {
  // 		setQuote(tempQuote)
  // 		setTempQuote('')
  // 	} else {
  // 		alert(data.error)
  // 	}
  // }

  return (
    <div class="quote">
      <h1> {quote || "Project is under devlopment!"}</h1>
      <form class="quote_form">
        <input
          type="text"
          placeholder="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <button class="quote_button" type="submit">
          Update quote
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
