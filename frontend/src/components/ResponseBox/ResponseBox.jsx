import React, { useState, useEffect } from "react";
import { Card, CardBody, Skeleton } from "@nextui-org/react";

export default function ResponseBox({ language }) {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notesData, setNotesData] = useState(null);

  // Effect to fetch notes data based on language
  useEffect(() => {
    setIsLoaded(false); // Reset loading state
    setTypedText(""); // Reset typed text
    setIndex(0); // Reset index

    import(`../../../../uploads/${language.toLowerCase()}.json`)
      .then((data) => {
        setNotesData(data.default);
      })
      .catch((error) => {
        console.error("Error fetching notes data:", error);
      });
  }, [language]);

  // Effect to simulate the typing effect
  useEffect(() => {
    if (notesData && index < notesData.notes.length) {
      const timer = setTimeout(() => {
        setTypedText(
          (prevTypedText) => prevTypedText + notesData.notes.charAt(index)
        );
        setIndex((prevIndex) => prevIndex + 1);
      }, 35); // Adjust the delay to control typing speed
      return () => clearTimeout(timer);
    }
  }, [index, notesData]);

  // Effect to simulate the skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000); // Change to false after 5 seconds
    return () => clearTimeout(timer);
  }, [notesData]);

  return (
    <div>
      <Card className="py-5 max-w-[1000px]">
        <CardBody>
          {!isLoaded || !notesData ? (
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
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {typedText}
            </pre>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
