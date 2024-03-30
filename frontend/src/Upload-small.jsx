import React from "react";
import NavBarUser from "./components/NavBar/NavBarUser";
import "./index.css";
import UploadBox from "./components/UploadBox/UploadBox";

export default function Upload() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <main style={{ flex: 1 }}>
        <div>
          <NavBarUser />
          <article
            class="prose lg:prose-lg dark:prose-invert"
            style={{
              textAlign: "center",
              maxWidth: "2000px",
              paddingTop: "40px",
            }}
          >
            <h1>Get study help automatically for your classes</h1>
            <h1
              style={{
                backgroundImage: "linear-gradient(to right, #EDE342, #FF51EB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Powered.
            </h1>
          </article>
          <div style={{ marginTop: "40px", marginBottom: "40px" }}>
            <UploadBox />
          </div>
        </div>
      </main>
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
