import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget-2";
import "react-chat-widget-2/lib/styles.css";
import { io } from "socket.io-client";

const socket = io("https://demoapi.apatternplus.com/", {
  transports: ["websocket"],
  upgrade: false,
});

const Moment = require("moment");

const Chat = ({ doctorid, doctorname, userid, usertype }) => {
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    if (usertype === "patient") {
      socket.emit(
        "send-message",
        `${localStorage.getItem("userName")}to ${doctorid}:  ${newMessage}`
      );
    }
    if (usertype === "doctor") {
      socket.emit(
        "send-message",
        `${localStorage.getItem("userName")}(DOCTOR_${userid}):  ${newMessage}`
      );
    }

    // Now send the message throught the backend API
  };

  var oldmessage = null;
  var oldTimeInMilliseconds = null;
  var oldType = null;
  function validateMessage(message, date, type) {
    // check here msg and time... if time different is less than 10 second its same msg

    if (oldType == null) oldType = type;

    // check if this new is 1st time msg
    if (oldmessage == null && oldTimeInMilliseconds == null) {
      oldmessage = message;
      oldTimeInMilliseconds = date;
      return true;
    }

    if (oldmessage != null && oldTimeInMilliseconds != null) {
      // check if this new msg is same but diff is more than 10 sec, than add
      let seconds = date.diff(oldTimeInMilliseconds, "seconds");
      console.log("seconds" + seconds);
      if (oldmessage == message && oldType == type && seconds > 50) {
        oldmessage = message;
        oldTimeInMilliseconds = date;
        return true;
      }
      if (oldmessage === message) {
        // if this msg not same
        oldmessage = message;
        oldTimeInMilliseconds = date;
        return false;
      } else {
        oldmessage = message;
        oldTimeInMilliseconds = date;
        return true;
      }
    }
  }

  useEffect(() => {
    addResponseMessage("Welcome to this awesome chat!");
  }, []);

  socket.on("get-message", (response) => {
    let currentTimeInMilliseconds = Moment();
    if (usertype === "doctor") {
      if (response.includes(userid)) {
        console.log(response.replace(`to DOCTOR_${userid}`, ""));
        if (validateMessage(response, currentTimeInMilliseconds, "doctor")) {
          addResponseMessage(response.replace(`to DOCTOR_${userid}`, ""));
        }
      }
    }
    if (usertype === "patient") {
      if (response.includes(`${doctorname}(${doctorid})`)) {
        if (validateMessage(response, currentTimeInMilliseconds, "patient")) {
          addResponseMessage(response.replace(`(${doctorid})`, ""));
        }
      }
    }
  });

  return (
    <div>
      <Widget
        title={localStorage.getItem("userName")}
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
};

export default Chat;
