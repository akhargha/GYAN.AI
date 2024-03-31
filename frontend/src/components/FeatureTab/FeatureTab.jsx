import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";

// Import your JSON files
import summaryData from "../../../../uploads/summary.json";
import questionData from "../../../../uploads/question.json";
import strategyData from "../../../../uploads/strategy.json";
import conversationData from "../../../../conversations.json";

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
      id: "strategy",
      label: "Strategy",
      content: strategyData.notes,
    },
    {
      id: "ask-questions", // New tab
      label: "Ask Questions",
      content: conversationData,
    },
  ];

  const [newQuestion, setNewQuestion] = useState("");

  const handleInputChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the submitted question
    console.log("Submitted question:", newQuestion);
    // Clear the input field after submission
    setNewQuestion("");
  };

  return (
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
            <div style={{ padding: "30px" }}>
              <CardBody className="p-4 max-w-[1200px] min-w-[1200px]">
                {item.id === "ask-questions" ? (
                  <form onSubmit={handleSubmit}>
                    <ul>
                      {item.content.map((conversation, index) => (
                        <li key={index} className="flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar
                              isBordered
                              src="https://i.ibb.co/V3g32fQ/DSC-6030-2.jpg"
                              color="warning"
                              size="sm"
                            />
                            <h3
                              style={{
                                fontSize: "1em",
                                fontWeight: "bold",
                                paddingLeft: "7px"
                              }}
                            >
                              User: <br />
                            </h3>
                          </div>
                          <p>{conversation.question}</p>
                          <div className="flex items-center gap-2">
                            <Avatar
                              isBordered
                              src="https://bootstraplogos.com/wp-content/uploads/edd/2018/07/logo.png"
                              color="warning"
                              size="sm"
                            />
                            <h3
                              style={{
                                fontSize: "1em",
                                fontWeight: "bold",
                                paddingLeft: "7px"
                              }}
                            >
                              Gyan-BOT: <br />
                            </h3>
                          </div>
                          <p style={{ paddingBottom: "30px" }}>
                            {conversation.answer}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Input
                        type="text"
                        variant="bordered"
                        label="Ask a question"
                        value={newQuestion}
                        onChange={handleInputChange}
                        color="warning"
                      />
                      <Button type="submit" color="warning" style={{ minHeight: "55px"}}>
                        Submit
                      </Button>
                    </div>
                  </form>
                ) : (
                  <pre
                    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                  >
                    {item.content}
                  </pre>
                )}
              </CardBody>
            </div>
          </Card>
        </Tab>
      )}
    </Tabs>
  );
}
