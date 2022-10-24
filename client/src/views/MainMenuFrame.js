import logo from '../logo.svg';
import './MainMenuStyle.css';
import ReactDOM from 'react-dom';
import React from 'react';


/*
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
    <div id="userProfile">
      <p class="inlineText">{"<<"}</p>
      <button class="inlineText" id="login">Login</button>
    </div>
  ); 

  elems[3] = (<Toggle />);

  return elems;
}

export default MainMenuElements;


class loginElement extends React.Component
{
  render() {
    return (
      
    );
  }
}
*/

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <section id="loginMenu">
        <form id="logregField">
          <fieldset>
            <legend>Register:</legend>
            <label for="email">email: </label>
            <input type="email" name="email"></input>
            <label for="username">name: </label>
            <input type="text" name="username"></input>
            <label for="password">password: </label>
            <input type="password" name="password"></input>
            <label for="repeatPassword">repeat: </label>
            <input type="password" name="repeatPassword"></input>
            <button name="submitForm" value="Register"></button>
          </fieldset>
        </form>
      </section>
    );
  }
}

export default Toggle;