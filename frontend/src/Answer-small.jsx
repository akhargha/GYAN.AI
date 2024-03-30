import React from "react";
import ResponseBox from "./components/ResponseBox/ResponseBox";
import NavBarUser from "./components/NavBar/NavBarUser";

export default function Answer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center horizontally
        minHeight: "100vh"
      }}
    >
      <NavBarUser />
      <div style={{ minWidth: "700px", paddingTop: "50px"}}>
        <ResponseBox />
      </div>
    </div>
  );
}
