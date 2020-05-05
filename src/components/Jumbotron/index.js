import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 50, textAlign: "center", backgroundColor: "#f1dfdf" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
