import React from "react";

const Header = (props) => {
  function handleLogout() {
    props.checkSignedIn(true);
  }
  return (
    <div className="Header">
      <h1>Task Management</h1>
      <h4 className="header-name" onClick={handleLogout}>
        {props.name}
      </h4>
    </div>
  );
};

export default Header;
