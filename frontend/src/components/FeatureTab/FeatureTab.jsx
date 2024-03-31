import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

// Import your JSON files
import summaryData from "../../../../uploads/summary.json";
import questionData from "../../../../uploads/question.json";
import strategyData from "../../../../uploads/strategy.json";

export default function FeatureTab() {
  // Define your tabs array using the content from your JSON files
  let tabs = [
    {
      id: "summary",
      label: "Summary",
      content: summaryData[0].summary_text,
    },
    {
      id: "question",
      label: "Question",
      content: questionData.notes,
    },
    {
      id: "strategy", // Ensure this matches your tab content intention
      label: "Strategy",
      content: strategyData.notes,
    },
  ];

  return (
    // Use flex container to center the Tabs component horizontally

    <Tabs
      aria-label="Dynamic tabs"
      items={tabs}
      className="max-w-md"
      color="warning"
      variant="bordered"
      size="lg"
    >
      {(item) => (
        <Tab key={item.id} title={item.label}>
          <Card>
            <CardBody className="max-w-[1200px] min-w-[1200px]">
              <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {item.content}
              </pre>
            </CardBody>
          </Card>
        </Tab>
      )}
    </Tabs>
  );
}
