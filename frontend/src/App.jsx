import React from "react";
import NavBar from "./components/NavBar/NavBar"

export default function App() {

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <NavBar/>

      <footer style={{
        width: '100%',
        position: 'sticky',
        bottom: 0,
        textAlign: 'center',
        borderTop: '1px dashed #888', // Gray separator line
        backgroundColor: '#000', // Black background color for the footer
        color: '#fff', // White text color for better contrast
        padding: '1rem 0', // Vertical padding
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)' // Dark-gray shadow for a more pronounced effect
      }}>
        Created by Anupam Khargharia, Shivanshu Dwivedi, Hyun Lee | YHacks 2024
      </footer>
    </div>
  );
}
