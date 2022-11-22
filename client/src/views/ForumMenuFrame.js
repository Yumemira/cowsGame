import React from "react";
import "./MainMenuStyle.css";
import MainMenuElements from "./MainMenuFrame.js";

class ForumMenu extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      uid:""
    }
    this.postCreateLink = this.postCreateLink.bind(this);
  }

  postCreateLink = () => {
    if(this.state.uid)
    {
      return "/new-post-create?" + this.state.uid;
    }
    else
    {
      return "";
    }
  }

  componentDidMount()
  {
    const id = localStorage.getItem("cow-bull--user-id");
    this.setState({
      uid: id
    });
  }

  render(){
    const elem = MainMenuElements();
    const linkCreate = this.postCreateLink();
    
    elem[1] = (
      <main>
        <div className='main--footer'><p>Форум</p></div>
        <a href={linkCreate} id='main--post-creator'>Новое обсуждение</a>
      </main>
    );
    return elem;
  }
}

export default ForumMenu;