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

  const uploadFile = () => {
    if (!selectedFile) return;
    setIsUploading(true); // Start the upload process

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setIsUploading(false); // Stop the upload process
        setNotes(response.data.notes); // Update the notes state with the received data
        window.location.href = "/answer.html"; // Redirect to a different page
      })
      .catch((error) => {
        setIsUploading(false); // In case of error, stop the upload process
        alert("Error uploading file");
      });
  };

  return (
    <div className="flex justify-center items-center">
      <Card
        className="py-5 max-w-[500px]"
        isHoverable
        isPressable
        style={{
          boxShadow: isHovered ? "0 0 60px rgba(230, 115, 28, 1)" : "0 0 30px rgba(230, 115, 28, 0.5)",
          border: "3px dashed gray"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => fileInputRef.current.click()}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex justify-center items-center">
          <h2 className="font-bold text-large" style={{color: "rgb(181, 179, 179)"}}>Upload your video here</h2>
        </CardHeader>
        <CardBody className="overflow-visible py-20 flex justify-center items-center">
          {isUploading ? (
            <Progress aria-label="Loading..." value={75} className="max-w-md"/>
          ) : (
            <>
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={video}
                width="50%"
                style={{ marginLeft: "50px" }}
              />
              <input type="file" style={{ display: "none" }} onChange={handleFileSelect} ref={fileInputRef} />
            </>
          )}
          {notes && (
            <div>
              <h2>Notes:</h2>
              <p>{notes}</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
