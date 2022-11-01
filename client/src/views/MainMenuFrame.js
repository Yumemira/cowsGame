import logo from '../logo.svg';
import './MainMenuStyle.css';
import ReactDOM from 'react-dom';
import React from 'react';
import classnames from "classnames";

function MainMenuElements()
{
  const elems = [4];
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
    this.state = {isToggleOn: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <div>
        <div id="userProfile">
          <p className="inlineText">{"<<"}</p>
          <button className="inlineText" id="login" onClick={this.handleClick}>Login</button>
        </div>
        <section id="loginMenu" className={classnames("login", {
            "login--hidden": !this.state.isToggleOn
          })}>
          <form id="logregField">
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
              <button name="submitForm">Register</button>
            </fieldset>
          </form>
        </section>
      </div>
    );
  }
}

export default MainMenuElements;