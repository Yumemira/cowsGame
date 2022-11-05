import React from "react";
import "./AboutMenuStyle.css";
import MainMenuElements from "./MainMenuFrame";

export default class AboutMenu extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      data:""
    };
  }

  componentDidMount()
  {

    fetch("http://localhost:3001/about")
      .then((res) => res.json())
      .then((fetchedData) => {
        this.setState({
          data:fetchedData.message
        });
      });
  }

  render(){
    let elems = MainMenuElements();
    elems[1] = (
        <main>
          <p className="inMainText">{this.state.data}</p>
        </main>
      );

    return elems;
  }
}
