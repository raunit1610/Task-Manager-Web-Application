import React from "react";
import axios from "axios";

const ForgotPass = (props) => {
  const [isEmail, setIsEmail] = React.useState(false);
  const [isUsername, setIsUsername] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [isPassword, setIsPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");

  function handleEmail() {
    setIsEmail(true);
    setIsUsername(false);
  }

  function handleUsername() {
    setIsUsername(true);
    setIsEmail(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = isEmail ? email : username;
    try {
      const response = await axios.post(
        "http://localhost:8000/login/forgotPassword",
        { data }
      );
      if (response.status === 200) {
        setIsPassword(true);
        setPassword(response.data.password);
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
    setIsEmail(false);
    setIsUsername(false);
  }

  function handleBack() {
    props.forgotpass(false);
  }

  return (
    <div className="Forgot-pass">
      {!isPassword && !isEmail && !isUsername && (
        <>
          <button onClick={handleEmail}>Email</button>
          <button onClick={handleUsername}>Username</button>
        </>
      )}
      {isEmail && (
        <form
          onSubmit={handleSubmit}
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {isUsername && (
        <form
          onSubmit={handleSubmit}
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {isPassword && <h4 style={{ color: "white" }}>{password}</h4>}
      <a href="#" onClick={handleBack}>
        Back
      </a>
    </div>
  );
};

export default ForgotPass;
