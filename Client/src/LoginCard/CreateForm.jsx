import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateForm(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dob, setDob] = React.useState("");

  const [err, setError] = React.useState("");

  const submit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
      dob: dob,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/login/create",
        data
      );
      if (response.status == 200 || response.status == 201) {
        console.log(response.status);
        props.created(true);
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error) {
      setError(error.message);
      console.log(err);
    }
  };

  return (
    <div className="Form">
      <form action="post" onSubmit={submit}>
        <label htmlFor="username" style={{ color: "rgb(170, 56, 56)" }}>
          Username
        </label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          style={{ color: "white" }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label htmlFor="email" style={{ color: "rgb(170, 56, 56)" }}>
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          style={{ color: "white" }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <label htmlFor="password" style={{ color: "rgb(170, 56, 56)" }}>
          Create Password
        </label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          style={{ color: "white" }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <label htmlFor="dob" style={{ color: "rgb(170, 56, 56)" }}>
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          style={{ color: "white" }}
          onChange={(e) => {
            setDob(e.target.value);
          }}
          required
        />
        <button type="submit" style={{ color: "rgb(170, 56, 56)" }}>
          Create Account
        </button>
      </form>
    </div>
  );
}
export default CreateForm;
