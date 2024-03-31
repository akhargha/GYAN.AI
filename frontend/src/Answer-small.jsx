import React from "react";
import ResponseBox from "./components/ResponseBox/ResponseBox";
import NavBarUser from "./components/NavBar/NavBarUser";
import FeatureTab from "./components/FeatureTab/FeatureTab";

import useSound from 'use-sound'
import mySound from '/Users/anupamkhargharia/Documents/GYAN.AI/uploads/english_tts.mp3' // Your sound file path here

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function Answer() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["notes"]));
  const [selectedDisplay, setSelectedDisplay] = React.useState("Language");

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const [playSound] = useSound(mySound)

  React.useEffect(() => {
    if (selectedKeys.has("notes")) {
      setSelectedDisplay("Language");
    } else {
      setSelectedDisplay(selectedValue);
    }
  }, [selectedKeys, selectedValue]);

  const playAudio = () => {
    useSound(mySound)
    /**
    // Adjust the path based on your server setup.
    const audioFilePath = `../uploads/${selectedValue.toLowerCase()}_tts.wav`;
    const audio = new Audio(audioFilePath);
    audio.play().catch(error => console.error("Error playing the audio file:", error));
     */
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <NavBarUser />
      <h1
        style={{
          fontSize: "3em",
          fontWeight: "bold",
          paddingTop: "30px",
        }}
      >
        Notes
      </h1>
      <div style={{ paddingLeft: "900px" }}>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {selectedDisplay}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Language"
            variant="shadow"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="notes">Language</DropdownItem>
            <DropdownItem key="English">English</DropdownItem>
            <DropdownItem key="French">French</DropdownItem>
            <DropdownItem key="German">German</DropdownItem>
            <DropdownItem key="Spanish">Spanish</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div
        style={{
          minWidth: "1000px",
          paddingTop: "20px",
          paddingBottom: "50px",
        }}
      >
        <ResponseBox language={selectedValue} />
        <div style={{ paddingTop: "10px", paddingLeft: "950px" }}>
          <Button
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="Take a photo"
            size="lg"
            onClick={() => playSound()} // Added onClick event handler to play audio
          >
            <i className="fa-solid fa-volume-high"></i>
          </Button>
        </div>
      </div>

      <FeatureTab />
    </div>
  );
}
