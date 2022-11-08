import './MainMenuStyle.css';
import React from 'react';
import classnames from "classnames";
import axios from "axios";
import validator from "validator";

function MainMenuElements()
{
  const elems = [3];
  //TODO: container main with contents, container upperFrame, top-right account button
  // upper frame with buttons that represents play, forum and about links to go;
  
  elems[0] = (
    <footer>
      <div id="upperFrame">
        <nav>
          <a href='/game-prepare'className="refButtons" key="p">Play</a>|
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
        <label htmlFor="email" key="fe">email: </label>
        <input type="email" name="email" key="e"></input><br/>
        <label htmlFor="username" key="fn">name: </label>
        <input type="text" name="username" key="n"></input><br/>
        <label htmlFor="password" key="fp">password: </label>
        <input type="password" name="password" key="p"></input><br/>
        <label htmlFor="repeatPassword" key="fr">repeat: </label>
        <input type="password" name="repeatPassword" key="r"></input><br/>
        <button name="submitForm" className="submitForm" onClick={getRegistered}>Register</button>
      </fieldset>
    );
  }
}

function getRegistered()
{
  const username = document.getElementsByName("username")[0].value;
  const useremail = document.getElementsByName("email")[0].value;
  const userpassword = document.getElementsByName("password")[0].value;
  const userRepeatPassword = document.getElementsByName("repeatPassword")[0].value;

  if(checkedData(username, useremail, userpassword, userRepeatPassword))
  {
    axios.post('http://localhost:3001/register',{uname: username,
    umail: useremail,
    upassword: userpassword})
    .then((res) => console.log(res.data.message))
    .catch(err => console.log(err));
  }
  else
  {
    console.log("failed to register");
  }
}

function checkedData(uname, email, pass, repeatpass)
{
  if(uname.length < 3)
  {
    return false;
  }
  if(pass.length < 8)
  {
    if(pass !== repeatpass)
    {
      return false;
    }
    return false;
  }
  if(!validator.isEmail(email))
  {
    return false;
  }

  return true;
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