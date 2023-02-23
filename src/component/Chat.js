import React, { useState, useEffect } from "react";
import Message from "./Message";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoIcon from "@material-ui/icons/Info";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import Axios from "axios";
import "../Chat.css";

export default function Chat({ user }) {
  const { roomID } = useParams(); // must coincide with the variable used in path route
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    const url = "http://localhost:9000/v1/channels/getChannelDetail";
    Axios.post(url, { name: roomID }).then((res) => {
      // console.log('Feteched from room details')
      const details = res.data;
      setRoomDetails(details);
    });
  }, [roomID]);

  useEffect(() => {
    const url = `http://localhost:9000/v1/channels/findMessage/${roomID}`;
    Axios.get(url, { name: roomID }).then((res) => {
      console.log("Feteched from room details");
      const details = res.data;
      console.log(details);

      setRoomMessages(details);
    });
  }, [roomMessages]);

  return (
    <div className="chat">
      <h2>You are in room: {roomID}</h2>
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{roomDetails?.name}</strong>
            <StarBorderIcon />
          </h4>
        </div>

        <div className="chat__headerRight">
          <p>
            <InfoIcon /> Details
          </p>
        </div>
      </div>

      <div className="messages">
        {roomMessages.map((room) => (
          <Message
            userImage={room.userImage}
            message={room.message}
            user={room.user}
          />
        ))}
      </div>

      <ChatInput
        user={user}
        channelName={roomDetails?.name}
        channelId={roomID}
      />
    </div>
  );
}
