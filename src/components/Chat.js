import React,{useEffect} from 'react'
import { Widget, addResponseMessage } from "react-chat-widget-2";
import "react-chat-widget-2/lib/styles.css";
import { io } from "socket.io-client";

const socket = io("https://demoapi.apatternplus.com/", {
  transports: ["websocket"],upgrade: false
});

const Chat = ({doctorid,doctorname,userid,usertype}) => {
    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        if (usertype==="patient"){
          socket.emit(
            "send-message",
            `${localStorage.getItem("userName")}to ${doctorid}:  ${newMessage}`
          );
        }
        if(usertype==="doctor"){
          socket.emit(
            "send-message",
            `${localStorage.getItem("userName")}(DOCTOR_${userid}):  ${newMessage}`
          );
        }
        
        // Now send the message throught the backend API
        
        
      };
      useEffect(() => {
        addResponseMessage("Welcome to this awesome chat!");
        
       
      }, []);
    
        socket.on("get-message", (response) => {
          if (usertype==="doctor"){
          if(response.includes(userid)){
            console.log(response.replace(`to DOCTOR_${userid}`,""))
            addResponseMessage(response.replace(`to DOCTOR_${userid}`,""));
          }
          
        }
        if(usertype==="patient"){
          if(response.includes(`${doctorname}(${doctorid})`)){
            addResponseMessage(response.replace(`(${doctorid})`,""));
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
    )
}

export default Chat
