import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [user, setuser] = useState({
    username: "",
    ph: null,
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setuser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/users", user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <input
        type="text"
        placeholder="Username"
        onChange={handleChange}
        name="username"
      />
      <input
        type="number"
        placeholder="Phone Number"
        onChange={handleChange}
        name="ph"
      />
      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        name="email"
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
