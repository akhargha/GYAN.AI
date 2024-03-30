import React, { useState, useEffect } from "react";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import notesData from "../../../../uploads/notes.json";

export default function ResponseBox() {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Effect to simulate the typing effect
  useEffect(() => {
    if (index < notesData.notes.length) {
      const timer = setTimeout(() => {
        setTypedText((prevTypedText) => prevTypedText + notesData.notes.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }, 60); // Adjust the delay to control typing speed
      return () => clearTimeout(timer);
    }
  }, [index]);

  // Effect to simulate the skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 5000); // Change to false after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Card className="py-5 max-w-[700px]">
        <CardBody>
          {!isLoaded ? (
            <div className="space-y-3">
              <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary"></div>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
              </Skeleton>
            </div>
          ) : (
            <pre>{typedText}</pre>
          )}
        </CardBody>
      </Card>
    </div>  
  );
}
