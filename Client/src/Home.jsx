import React from "react";
import Header from "./Home/Header.jsx";
import Body from "./Home/Body.jsx";
import "./Home/Home.css";

function Home(props) {
  return (
    <div className="Home">
      <Header name={props.headerName} checkSignedIn={props.checkSignedIn} />
      <Body uid={props.uid} />
    </div>
  );
}

export default Home;
