import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import notesData from "../../../../uploads/notes.json";

export default function ResponseBox() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Only proceed if we haven't reached the end of the notes text
    if (index < notesData.notes.length) {
      // Use setTimeout to delay each character's appearance
      const timer = setTimeout(() => {
        // Append the next character to the typedText state
        setTypedText((prevTypedText) => prevTypedText + notesData.notes.charAt(index));
        // Move to the next character
        setIndex((prevIndex) => prevIndex + 1);
      }, 50); // Adjust the delay to control typing speed

      // Cleanup the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [index]); // This effect depends on the current index

  return (
    <Card className="py-5 max-w-[900px]">
      <CardBody>
        <pre>{typedText}</pre>
      </CardBody>
    </Card>
  );
}
