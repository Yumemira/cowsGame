import logo from '../logo.svg';
import './MainMenuStyle.css';
import ReactDOM from 'react-dom';
import React from 'react';
import classnames from "classnames";

function MainMenuElements()
{
  const elems = [3];
  //TODO: container main with contents, container upperFrame, top-right account button
  // upper frame with buttons that represents play, forum and about links to go;
  
  elems[0] = (
    <footer>
      <div id="upperFrame">
        <nav>
          <a>Play</a>|
          <a>Forum</a>|
          <a>About</a>
        </nav>
      </div>
    </footer>
  );
  //main container with content loads dynamicly
  elems[1] = (
    <main>
      
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
        <div id="userProfile">
          <p className="inlineText">{"<<"}</p>
          <button className="inlineText" id="login" onClick={this.handleClick}>login</button>
        </div>
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
        <button name="submitForm" className="submitForm">Register</button>
      </fieldset>
    );
  }
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