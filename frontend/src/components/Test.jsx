import React from "react";
import notesData from "../../../uploads/notes.json";
const Test = () => {
  return (
    <div>
      <p>{notesData.notes}</p>
    </div>
  );
};

export default Test;
