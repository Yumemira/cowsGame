import './MainMenuStyle.css';
import React from 'react';
import classnames from "classnames";
import axios from "axios";

function MainMenuElements()
{
  const elems = [3];
  //TODO: container main with contents, container upperFrame, top-right account button
  // upper frame with buttons that represents play, forum and about links to go;
  
  elems[0] = (
    <footer>
      <div id="upperFrame">
        <nav>
          <a className="refButtons" key="p">Play</a>|
          <a href='/' className="refButtons" key="f">Forum</a>|
          <a href='/about' className="refButtons" key="a">About</a>
        </nav>
      </div>
    </footer>
  );
  //main container with content loads dynamicly
  elems[1] = (
    <main>
      <button name="submitForm" className="submitForm" onClick={getRegistered}>Register</button>
    </main>
  ); 

  elems[2] = (
    <Toggle />
  );

  return elems;
}

function toggling()
{
  const elem = document.getElementsByTagName("Toggle")[0].handleClick()
}


class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      isRegisterOn: true,
      toggleButtonText: "Login"
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.changeFieldset = this.changeFieldset.bind(this);
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  changeFieldset = () => {
    let texting;
    if(this.state.isRegisterOn)
    {
      texting = "Register"
    }
    else
    {
      texting = "Login"
    }

    this.setState(prevState => ({
      isRegisterOn: !prevState.isRegisterOn,
      toggleButtonText: texting
    }));
  }

  render() {
    let fieldSet;

    if(this.state.isRegisterOn)
    {
      fieldSet = <RegisterField />;
    }
    else
    {
      fieldSet = <LoginField />;
    }
    return (
      <div>
        <button id="inlineText" onClick={this.handleClick}>{"<<"} login</button>
        <section id="loginMenu" className={classnames("--visibled", {
            "--hidden": !this.state.isToggleOn
          })}>
          <form id="logregField">
            <input type='button' value={this.state.toggleButtonText} onClick={this.changeFieldset}></input>
            {fieldSet}
          </form>
        </section>
      </div>
    );
  }
}

class RegisterField extends React.Component
{
  render() {
    return(
      <fieldset>
        <legend>Register:</legend>
        <label htmlFor="email">email: </label>
        <input type="email" name="email"></input><br/>
        <label htmlFor="username">name: </label>
        <input type="text" name="username"></input><br/>
        <label htmlFor="password">password: </label>
        <input type="password" name="password"></input><br/>
        <label htmlFor="repeatPassword">repeat: </label>
        <input type="password" name="repeatPassword"></input><br/>
        <button name="submitForm" className="submitForm" onClick={getRegistered}>Register</button>
      </fieldset>
    );
  }
}

function getRegistered()
{
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  const username = document.getElementsByName("name")[0];
  const useremail = document.getElementsByName("email")[0];
  const userpassword = document.getElementsByName("password")[0];

  axios.post('http://localhost:3001/register',{title:"this is not the end!"})
  .then((res) => console.log(res.data))
  .catch(err => console.log(err));
}
class LoginField extends React.Component
{
  render() {
    return(
      <fieldset>
        <legend>login</legend>
        <label htmlFor="email">email: </label>
        <input type="email" name="email"></input><br/>
        <label htmlFor="password">password: </label>
        <input type="password" name="password"></input><br/>
        <button name="submitForm" className="submitForm">Register</button>
      </fieldset>
    );
  }
}

export default MainMenuElements;