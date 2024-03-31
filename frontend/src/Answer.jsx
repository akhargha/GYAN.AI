// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import Answer from "./Answer-small";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <Answer />
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
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
