import React from "react";
import NavBar from "./components/NavBar/NavBar";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

import image from "./landing.jpg";
import LoginModal from "./components/LoginModal/LoginModal";
import StartedModal from "./components/LoginModal/StartedModal";

export default function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <NavBar />

      <div
        style={{
          maxWidth: "1600px",
          paddingTop: "30px",
          paddingLeft: "110px",
          paddingBottom: "30px",
        }}
      >
        <Card
          isFooterBlurred
          className="w-full h-[650px] col-span-12 sm:col-span-7"
        >
          <CardHeader
            className="absolute z-10 top-1 flex-col items-start"
            style={{ padding: "20px" }}
          >
            <p
              className="text-tiny text-black/60 uppercase font-bold"
              style={{ fontSize: "1.2rem" }}
            >
              Take control of your studies
            </p>
            <h4
              className="text-black/90 font-medium text-xl"
              style={{ fontSize: "2.5rem", paddingTop: "20px" }}
            >
              Learning Unleashed: <br />
              <div style={{ paddingTop: "15px" }}>
                Every Lecture, Every Note, Everyone.
              </div>
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src={image}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Breathing app icon"
                className="rounded-full w-10 h-11 bg-black"
                src={image}
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">G(Y)AN.AI</p>
                <p className="text-tiny text-white/60">
                  Study Smarter, Not Harder: Accessible Transcripts and
                  Summaries.
                </p>
              </div>
            </div>
            <StartedModal />
          </CardFooter>
        </Card>
      </div>

      <footer
        style={{
          width: "100%",
          position: "sticky",
          bottom: 0,
          textAlign: "center",
          borderTop: "1px dashed #888", // Gray separator line
          backgroundColor: "#000", // Black background color for the footer
          color: "#fff", // White text color for better contrast
          padding: "1rem 0", // Vertical padding
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.5)", // Dark-gray shadow for a more pronounced effect
        }}
      >
        Created by Anupam Khargharia, Shivanshu Dwivedi, Hyun Lee | YHacks 2024
      </footer>
    </div>
  );
}
