import React from "react";
import "./MainMenuStyle.css";
import MainMenuElements from "./MainMenuFrame.js";

class ForumMenu extends React.Component
{
  render(){
    const elem = MainMenuElements();
    return elem;
  }
}

export default ForumMenu;