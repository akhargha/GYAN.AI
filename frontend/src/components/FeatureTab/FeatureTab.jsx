import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Avatar,
  Input,
  Button,
} from "@nextui-org/react";
import axios from "axios"; // Ensure axios is installed for HTTP requests

// Import your JSON files for other tabs, if they exist
import summaryData from "../../../../uploads/summary.json";
import questionData from "../../../../uploads/question.json";
import strategyData from "../../../../uploads/strategy.json";

export default function FeaturesTab() {
  const [tabs, setTabs] = useState([
    {
      id: "summary",
      label: "Summary",
      content: summaryData[0].summary_text,
    },
    {
      id: "question",
      label: "Questions",
      content: questionData.notes,
    },
    {
      id: "strategy",
      label: "Strategy",
      content: strategyData.notes,
    },
    // Initially, conversation data is empty; it will be populated via useEffect
    {
      id: "ask-questions",
      label: "Ask Questions",
      content: [],
    },
  ]);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5005/conversations");
      const updatedTabs = tabs.map((tab) => {
        if (tab.id === "ask-questions") {
          return { ...tab, content: response.data };
        }
        return tab;
      });
      setTabs(updatedTabs);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  const handleInputChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5005/ask", { question: newQuestion });
      fetchConversations(); // Fetch updated conversations after adding a new one
      setNewQuestion(""); // Reset input field after submission
    } catch (error) {
      console.error("Failed to submit question:", error);
    }
  };

  return (
    <Tabs
      aria-label="Features tabs"
      initialValue="summary"
      className="max-w-md"
      color="warning"
      variant="bordered"
      size="lg"
    >
      {tabs.map((tab) => (
        <Tab key={tab.id} title={tab.label}>
          <Card>
            <CardBody className="p-4 max-w-[1200px] min-w-[1200px]">
              {tab.id === "ask-questions" ? (
                <>
                  <ul>
                    {tab.content.map((conversation, index) => (
                      <li key={index} style={{ marginBottom: "20px" }}>
                        <div className="flex items-center gap-2">
                          <Avatar
                            isBordered
                            src="https://i.ibb.co/V3g32fQ/DSC-6030-2.jpg"
                            color="warning"
                            size="sm"
                            text="Q"
                          />
                          <h3
                            style={{
                              fontSize: "1em",
                              fontWeight: "bold",
                              paddingLeft: "7px",
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
                              paddingLeft: "7px",
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
                    <form
                      onSubmit={handleSubmit}
                      style={{ marginBottom: "20px" }}
                    >
                      <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Your question"
                        value={newQuestion}
                        onChange={handleInputChange}
                      />
                      <Button
                        auto
                        type="submit"
                        color="primary"
                        style={{ marginTop: "10px" }}
                      >
                        Submit
                      </Button>
                    </form>
                  </ul>
                </>
              ) : (
                <pre>{tab.content}</pre>
              )}
            </CardBody>
          </Card>
        </Tab>
      ))}
    </Tabs>
  );
}