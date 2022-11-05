import React from "react";
import "./AboutMenuStyle.css";
import MainMenuElements from "./MainMenuFrame";


function GetDataFunc()
{
  const [data, setData] = React.useState(() => null);
  
  React.useEffect(() => {
    fetch("/about")
      .then((res) => res.json())
      .then((data) => console.log("Lived!"));
  }, []);
  
  let elem = MainMenuElements();
  elem[1] = (
    <main>
      <p>{data}</p>
    </main>
  );
  return elem;
}

export default class AboutMenu extends React.Component
{
  render(){
    let elems = MainMenuElements();

    return elems;
  }
}
