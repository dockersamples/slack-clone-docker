import React from "react";
import "../Message.css";

export default function Message({ message, timestamp, user, userImage }) {
  const genTimeStamp = () => {
    const time = new Date();
    return time.toUTCString();
  };

  return (
    <div className="message">
      <img src={userImage} alt="" />
      <div className="message__info">
        <h4>
          {user} <span className="message__timestamp">{genTimeStamp()}</span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}
