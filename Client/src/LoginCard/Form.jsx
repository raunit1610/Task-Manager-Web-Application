import React from "react";
import axios from "axios";

function Form(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8000/login/", data);

      if (response.status === 200) {
        props.header(username);
        props.signedIn(true);
        props.uid(response.data.uid);
        console.log(response.data.uid);
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Form">
      <form action="post" onSubmit={submit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Form;
