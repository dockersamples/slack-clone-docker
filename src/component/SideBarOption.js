import React, { useState, useEffect } from "react";
import "../SidebarOption.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";
//add database connection,

// when the url needs to be changed programatically

export default function SideBarOption({
  Icon,
  title,
  id,
  setNewChannel,
  addChannelOption,
}) {
  const history = useHistory();

  const selectChannel = () => {
    // if id came from database or datastore
    // when click on channel will force a redirect with the useHistory hook
    // when you go back a page or forward a page the history is being modified
    // when the component loads we have the roomID so we can load the data we need.
    if (id) {
      history.push(`/room/${id}`);
      // so this would  redirect us to the room we selected
      // very nice!
    } else {
      history.push(`/room/${title}`);
    }
  };

  const updateDatabase = (channelName) => {
    // const url = "http://localhost:9000/v1/channels/add"
    const url = "http://localhost:9000/v1/channels/add";
    Axios.post(url, {
      id: Math.floor(Math.random() * 100000000),
      name: channelName,
    }).then((res) => {
      console.log(res.data);
      console.log(`${channelName} has been added!!!!!!`);
      setNewChannel(res.data);
    });
  };

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      updateDatabase(channelName);
    }
  };
  return (
    <div
      className="sidebarOption"
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span>
          {title}
        </h3>
      )}
    </div>
  );
}
