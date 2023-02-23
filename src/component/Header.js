import React from "react";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import "../Header.css";
//ES7 React Redux Snippet
export default function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <Avatar className="header__avatar" alt="Elliott" src="" />
        <AccessTimeIcon />
      </div>
      <div className="header__search">
        <SearchIcon />
        <input placeholder="MERN Slack Clone" />
      </div>

      <div className="header__right">
        <HelpOutlineIcon />
      </div>
    </div>
  );
}
