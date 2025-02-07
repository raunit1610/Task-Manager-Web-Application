import React from "react";
import Form from "./LoginCard/Form.JSX";
import CreateForm from "./LoginCard/CreateForm.jsx";
import Home from "./Home.jsx";
import ForgotPass from "./LoginCard/ForgotPass.jsx";

function LoginCard() {
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [animateCard, setAnimateCard] = React.useState({
    transform: "none",
    transition: "none",
    backfaceVisibility: "visible",
  });
  const [header, setHeader] = React.useState("User");
  const [uid, setUid] = React.useState(null);
  const [forgotpass, setForgotpass] = React.useState(false);

  React.useEffect(() => {
    if (!isLoginForm) {
      document.body.style.backgroundImage =
        "url(https://wallpapercave.com/wp/wp2810076.jpg)";
    } else {
      document.body.style.backgroundImage =
        "url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dce3647b-6179-463c-b4c8-bd642f5bb216/da4f4gg-be1f2697-69ac-4569-9c34-ac77393df366.png/v1/fill/w_1192,h_670,q_70,strp/wallpapers___cyan_abstract_polygons__black_bg__by_kaminohunter_da4f4gg-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcL2RjZTM2NDdiLTYxNzktNDYzYy1iNGM4LWJkNjQyZjViYjIxNlwvZGE0ZjRnZy1iZTFmMjY5Ny02OWFjLTQ1NjktOWMzNC1hYzc3MzkzZGYzNjYucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.rTjpLhbJtVlXj8_hdIt0A4994rQ-A0G8G_0YCZt_1-E)";
    }
  }, [isLoginForm]);

  function handleClick(event) {
    event.preventDefault();
    setAnimateCard({
      ...animateCard,
      transform: "rotateY(180deg)",
      transition: "transform 0.6s",
    });

    setTimeout(() => {
      setIsLoginForm(!isLoginForm);
      setAnimateCard({
        ...animateCard,
        backfaceVisibility: "hidden",
        transform: "rotateY(0deg)",
      });
    }, 300);
  }

  function handleCreated(e) {
    setIsLoginForm(e);
  }

  function handleSignedIn(e) {
    setIsSignedIn(e);
  }

  function handleHeader(e) {
    setHeader(e);
  }

  function handleUid(e) {
    setUid(e);
  }

  function checkSignedIn(e) {
    if (e) {
      setIsSignedIn(!e);
      setIsLoginForm(e);
    }
  }

  function handleForgotpass() {
    setForgotpass(!forgotpass);
  }

  function handleBack(e) {
    setForgotpass(e);
  }
  return (
    <div className="Main">
      {isSignedIn ? (
        <div>
          <Home headerName={header} uid={uid} checkSignedIn={checkSignedIn} />
        </div>
      ) : !forgotpass ? (
        <div className="Login-card" style={animateCard}>
          <h2
            style={
              !isLoginForm
                ? { color: "rgb(170, 56, 56)" }
                : { color: "rgb(106, 169, 195)" }
            }
          >
            {isLoginForm ? "Login" : "Create Account"}
          </h2>
          {isLoginForm ? (
            <Form
              signedIn={handleSignedIn}
              header={handleHeader}
              uid={handleUid}
            />
          ) : (
            <CreateForm created={handleCreated} />
          )}
          <a
            href="#"
            onClick={handleClick}
            style={
              !isLoginForm
                ? { color: "rgb(170, 56, 56)" }
                : { color: "rgb(106, 169, 195)" }
            }
          >
            {isLoginForm ? "Create an account" : "Back to login"}
          </a>
          {isLoginForm && (
            <a href="#" onClick={handleForgotpass}>
              Forgot Password?
            </a>
          )}
        </div>
      ) : (
        <div className="Login-card" style={animateCard}>
          <ForgotPass forgotpass={handleBack} />
        </div>
      )}
    </div>
  );
}

export default LoginCard;
