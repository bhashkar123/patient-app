import React, { useEffect, useContext, useState, useRef } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { CoreContext } from "../context/core-context";

const Inbox = (props) => {
  const [threadMobile, setThreadMobile] = useState("");
  const [threadName, setThreadName] = useState("");
  const [message, setMessage] = useState("");
  const [messageCount, setMessageCount] = useState("");

  const coreContext = useContext(CoreContext);
  const eventSource = new EventSource(
    "https://patient-api.siddhantait.com/message-count"
  );

  const focusText = useRef(null);

  useEffect(
    (eventSource.onmessage = (e) => {
      if (e) {
        setMessageCount(e.data);
      }
    }),
    []
  );

  const fetchInboxMessages = () => {
    coreContext.fetchMessages();
  };

  const fetchThreadMessages = (filter, mobile, name) => {
    setThreadMobile(mobile);
    setThreadName(name);
    coreContext.fetchThreadMessages(filter, mobile);
    //        focusText.current.focus();
  };

  const onSendMessage = () => {
    axios
      .post("send-sms", { mobilePhone: threadMobile, message })
      .then((response) => {
        const status = response.data.status;
        if (status.trim() === "success") {
          coreContext.fetchMessages();
          coreContext.fetchThreadMessages("from", threadMobile);
        }
      })
      .catch(() => alert("Message Sending failed"));
  };

  const renderInboxMessages = () => {
    if (coreContext.inbox.length > 0) {
      return coreContext.inbox.map((message) => {
        return (
          <div
            style={{ fontSize: 12, lineHeight: 0.5 }}
            className="card shadow p-3 mb-4 bg-white rounded">
            <div className="card-header">
              From :{" "}
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
                onClick={() =>
                  fetchThreadMessages(
                    "from",
                    message.from,
                    message.patient_name
                  )
                }
                className="mr-4">
                {" "}
                {message.patient_name}
              </span>{" "}
              <span style={{ fontSize: 8 }}>Time : {message.date}</span>
            </div>
            <div
              style={{ fontWeight: "bold", lineHeight: 1 }}
              className="card-body">
              {message.body}
            </div>
          </div>
        );
      });
    }
  };

  const renderThreads = () => {
    if (coreContext.threads.length > 0) {
      return coreContext.threads.map((message) => {
        return (
          <div
            style={{ fontWeight: "bold", lineHeight: 1 }}
            className="card-body">
            <span>{message.body}</span>
            <br />
            <span style={{ fontSize: 8 }}>Time : {message.date}</span>
          </div>
        );
      });
    }
  };

  // useEffect(fetchInboxMessages, [messageCount]);

  useEffect(coreContext.backUpMessages, [messageCount]);

  return (
    <div className="row">
      <div className="col-md-7 card shadow p-3 mb-5 bg-white rounded">
        <div className="card-body">{renderInboxMessages()}</div>
      </div>
      <div
        style={{ height: "600px", overflowY: "auto" }}
        className="col-md-5 sticky-top">
        {coreContext.threads.length > 0 ? (
          <div
            style={{ fontSize: 12, lineHeight: 0.5 }}
            className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-header">
              <span>{threadName}</span>{" "}
            </div>
            {renderThreads()}
            <div className="card-footer">
              <Form.Group>
                <Form.Label>Send a reply</Form.Label>
                <Form.Control
                  autoFocus
                  ref={focusText}
                  size="sm"
                  as="textarea"
                  rows={3}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  placeholder="Enter your message"
                />
              </Form.Group>
              <Button variant="secondary" onClick={onSendMessage}>
                {" "}
                Send
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export { Inbox };
