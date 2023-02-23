import React, { useState, useEffect } from "react";
import SideBarOption from "./SideBarOption";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import AddIcon from "@material-ui/icons/Add";
import SportsGolfIcon from "@material-ui/icons/SportsGolf";
import CreateIcon from "@material-ui/icons/Create";
import Axios from "axios";
import "../Sidebar.css";

export default function SideBar({ user }) {
  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState(1);

  useEffect(() => {
    const url = "http://localhost:9000/v1/channels";
    Axios.get(url).then((res) => {
      console.log("channels loaded");
      const channelList = res.data;
      setChannels(channelList);
    });
  }, [newChannel]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Si3mshady SlackClone</h2>
          <h3>
            <FiberManualRecordIcon />
            {user.email}
          </h3>
        </div>

        <CreateIcon />
      </div>
      <SideBarOption Icon={InsertCommentIcon} title="Threads" />
      <SideBarOption Icon={InboxIcon} title="Inbox" />
      <SideBarOption Icon={NewReleasesIcon} title="New Release" />
      <SideBarOption Icon={LiveTvIcon} title="LiveTV" />
      <SideBarOption Icon={LocalAtmIcon} title="CashTalk" />
      <SideBarOption Icon={SportsGolfIcon} title="Golf 24/7" />
      <SideBarOption Icon={SportsKabaddiIcon} title="ESPN" />
      <SideBarOption Icon={ExpandLessIcon} title="Show Less" />

      <hr />
      <SideBarOption Icon={ExpandMoreIcon} title="Channels" />

      <hr />
      <SideBarOption
        Icon={AddIcon}
        setNewChannel={setNewChannel}
        addChannelOption
        title="Add Channel"
      />
      {channels.map((channel) => (
        <SideBarOption title={channel.name} />
      ))}
    </div>
  );
}
