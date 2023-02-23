import React, { useState } from "react";
import "../ChatInput.css";
import { Button } from "@material-ui/core";
import Axios from "axios";

export default function ChatInput({ channelName, channelId, user }) {
  const [input, setInput] = useState("");
  const genTimeStamp = () => {
    const time = new Date();
    return time.toUTCString();
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      const newMessage = {
        message: input,
        timestamp: genTimeStamp(),
        user: user.email,
        userImage: user.userImage,
        channelId: channelId,
      };

      const url = "http://localhost:9000/newMessage";

      Axios.post(url, newMessage).then((res) => {
        console.log("new Message loaded into database");
        console.log(newMessage);
      });
    }
  };
  return (
    <div className="chatInput">
      <form>
        <input
          name="newMessage"
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <Button type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </div>
  );
}

{
  /* <input onChange={handlePassword} type="password"   placeholder='password' name="password" value={password} /> */
}
