import React from "react";
import {Card, CardBody} from "@nextui-org/react";
import notesData from "../../../../uploads/notes.json";

export default function ResponseBox() {
  return (
    <Card className="py-5 max-w-[900px]">
      <CardBody>
      {notesData.notes}
      </CardBody>
    </Card>
  );
}
