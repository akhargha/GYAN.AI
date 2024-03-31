import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardBody, Image, Progress } from "@nextui-org/react";
import axios from "axios";
import video from "../../assets/video.png";

export default function UploadBox() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false); // New state to track upload status
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadFile();
    }
  }, [selectedFile]);

  const uploadFile = async () => {
    if (!selectedFile) return;
    setIsUploading(true); // Start the upload process

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const uploadResponse = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setNotes(uploadResponse.data.notes); // Update the notes state with the received data

      // Now, make additional requests for translations
      const translateEndpoints = [
        { language: "Spanish", url: "http://127.0.0.1:5001/translation/get-spanish" },
        { language: "French", url: "http://127.0.0.1:5001/translation/get-french" },
        { language: "German", url: "http://127.0.0.1:5001/translation/get-german" },
        // Add more endpoints as needed
      ];

      for (const endpoint of translateEndpoints) {
        const response = await axios.get(endpoint.url);
        const summaryResponse = await axios.post("http://127.0.0.1:5002/InputText/generate-api");
        const strategy = await axios.get('http://127.0.0.1:5007/generate-study-plan');
        const quiz = await axios.post("http://127.0.0.1:5004/question/generate-api");
        // Handle the response for each language translation
        // For example, you can set state or log the translation
        console.log(`${endpoint.language} translation:`, response.data);
      }

      // After all translations, redirect or perform further actions
      window.location.href = "/answer.html"; // Redirect to a different page
    } catch (error) {
      console.error("Error during the file upload and processing:", error);
      alert("Error uploading file");
    } finally {
      setIsUploading(false); // Stop the upload process regardless of outcome
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card
        className="py-5 max-w-[500px]"
        isHoverable
        isPressable
        style={{
          boxShadow: isHovered
            ? "0 0 60px rgba(230, 115, 28, 1)"
            : "0 0 30px rgba(230, 115, 28, 0.5)",
          border: "3px dashed gray",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => fileInputRef.current.click()}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex justify-center items-center">
          <h2
            className="font-bold text-large"
            style={{ color: "rgb(181, 179, 179)" }}
          >
            Upload your video here
          </h2>
        </CardHeader>
        <CardBody className="overflow-visible py-20 flex justify-center items-center">
          {isUploading ? (
            <Progress
              aria-label="Loading..."
              value={75}
              isIndeterminate
              classNames={{
                base: "max-w-md",
                track: "drop-shadow-md border border-default",
                indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",
              }}
            />
          ) : (
            <>
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={video}
                width="50%"
                style={{ marginLeft: "50px" }}
              />
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileSelect}
                ref={fileInputRef}
              />
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
