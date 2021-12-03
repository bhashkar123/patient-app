import { Widget, addResponseMessage,handleToggle } from "react-chat-widget-2";
import React, { useState, useEffect, useContext } from "react";
import "react-chat-widget-2/lib/styles.css";
import { io } from "socket.io-client";
import { Box} from "@mui/system";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
const Moment = require("moment");

const socket = io("https://demoapi.apatternplus.com/", {
  transports: ["websocket"],
});

const Chat = ({usertype,userid,doctorid,doctorname,handleOpen,enduser}) => {
  
 
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
        `${localStorage.getItem("userName")}(DOCTOR_${userid} to ${enduser}):  ${newMessage}`
      );
    }

    // Now send the message throught the backend API
    if (usertype === "patient") {
      socket.on("get-message", (response) => {
        let currentTimeInMilliseconds = Moment();
        if (response.includes(`${doctorname}(${doctorid} to ${userid})`)) {
          if (validateMessage(response, currentTimeInMilliseconds, "patient")) {
            addResponseMessage(response.replace(`(${doctorid})`, ""));
          }
          //addResponseMessage(response);
        }
      });
    }

    if (usertype === "doctor") {
      socket.on("get-message", (response) => {
        let currentTimeInMilliseconds = Moment();
        if (response.includes(userid)) {
          if (validateMessage(response, currentTimeInMilliseconds, "doctor")) {
            addResponseMessage(response.replace(`to DOCTOR_${userid}`, ""));
          }
        }
      });
    }
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
      if (oldmessage === message && oldType === type && seconds > 50) {
        oldmessage = message;
        oldTimeInMilliseconds = date;
        return true;
      }
      if (oldmessage.toString().trim() === message.toString().trim()) {
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
  return (
    <div>
      
      <Widget
          title={localStorage.getItem("userName")}
          subtitle={`Chat With${enduser}`}
          handleNewUserMessage={handleNewUserMessage}
          // handleToggle={()=>{(usertype==="doctor")?handleOpen():alert("start chatting")}}
        />
    </div>

  )}

export default Chat
