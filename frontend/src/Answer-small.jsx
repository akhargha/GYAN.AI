import React from "react";
import ResponseBox from "./components/ResponseBox/ResponseBox";
import NavBarUser from "./components/NavBar/NavBarUser";

export default function Answer() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
      <NavBarUser />
      <ResponseBox />
    </div>
  );
}
