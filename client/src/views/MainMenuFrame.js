import './MainMenuStyle.css';
import React from 'react';
import classnames from "classnames";
import axios from "axios";
import validator from "validator";

function MainMenuElements()
{
  
  const elems = [3];
  
  elems[0] = (
    <footer id="footer--main">
        <nav>
          <a href='/game-prepare'className="refButtons" key="p">Играть</a>
          <a href='/' className="refButtons" key="f">Форум</a>
          <a href='/about' className="refButtons" key="a">О проекте</a>
        </nav>
    </footer>
  );
  elems[1] = (
    <main>

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
      toggleButtonText: "Вход"
    };

    this.handleClick = this.handleClick.bind(this);
    this.changeFieldset = this.changeFieldset.bind(this);
    this.intoProfile = this.intoProfile.bind(this);
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  intoProfile = () => {
    return "/profile?id=" + JSON.parse(localStorage.getItem("cow-bull--user-id"));
  }

  changeFieldset = () => {
    let texting;
    if(this.state.isRegisterOn)
    {
      texting = "Регистрация";
    }
    else
    {
      texting = "Вход";
    }

    this.setState(prevState => ({
      isRegisterOn: !prevState.isRegisterOn,
      toggleButtonText: texting
    }));
  }

  render() {
    if(false|JSON.parse(localStorage.getItem("cow-bull--login-state")))
    {
      const hrefLink = this.intoProfile();
      return (
        <div>
          <button id="inlineText" href={hrefLink}>{"<< " + JSON.parse(localStorage.getItem("cow-bull--user-name"))}  </button>
        </div>
      );
    }

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
          <button id="inlineText" onClick={this.handleClick}>{"<<"} Войти </button>
          <section id="loginMenu" className={classnames("--visibled", {
              "--hidden": !this.state.isToggleOn
            })}>
            <div id="logregField">
              <input type='button' value={this.state.toggleButtonText} onClick={this.changeFieldset}></input>
              {fieldSet}
            </div>
          </section>
        </div>
      );
  }
}

class RegisterField extends React.Component
{

  constructor(props)
  {
    super(props);
    this.getRegistered = this.getRegistered.bind(this);
  }

  getRegistered = function()
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
      .then((res) => {
        inlineEdit("attentionRegText", res.data.message)
        if(res.data.success)
        {   
          if(prompt("Сохранить данные для входа?"))
          {
            localStorage.setItem("cow-bull--name", JSON.stringify(username));
            localStorage.setItem("cow-bull--email", JSON.stringify(useremail));
          }
          localStorage.setItem("cow-bull--user-id", JSON.stringify(res.data.userid));
          localStorage.setItem("cow-bull--login-state", JSON.stringify(true));
          localStorage.setItem("cow-bull--login-key", JSON.stringify(res.data.lkey));
          window.location.reload();
        }
      })
      .catch(err => console.log(err));
    }
  }

  render() {
    return(
      <>
        <p> Регистрация </p>
        <p id ="attentionRegText"></p>
        <label htmlFor="email" key="fe"> почта: </label>
        <input type="email" name="email" key="e"></input><br/>
        <label htmlFor="username" key="fn"> имя: </label>
        <input type="text" name="username" key="n"></input><br/>
        <label htmlFor="password" key="fp"> пароль: </label>
        <input type="password" name="password" key="p"></input><br/>
        <label htmlFor="repeatPassword" key="fr"> повтор пароля: </label>
        <input type="password" name="repeatPassword" key="r"></input><br/>
        <button name="submitForm" className="submitForm" onClick={this.getRegistered}> Зарегистрироваться </button>
      </>
    );
  }
}



function inlineEdit(fieldId, textMessage)
{
  document.getElementById(fieldId).innerText = textMessage;
}

function checkedData(uname, email, pass, repeatpass)
{
  let fid = "attentionRegText";

  if(uname.length < 3)
  {
    inlineEdit(fid, "Имя должно быть не короче 3х символов");
    return false;
  }
  if(pass.length < 8)
  {
    inlineEdit(fid, "Пароль должен иметь длину не менее 8 символов");
    return false;
  }
  if(pass !== repeatpass)
  {
    inlineEdit(fid, "Пароли не совпадают");
    return false;
  }
  if(!validator.isEmail(email))
  {
    inlineEdit(fid, "Неверная почта");
    return false;
  }

  return true;
}


class LoginField extends React.Component
{
  constructor(props)
  {
    super(props);
    this.getLogining = this.getLogining.bind(this);
  }
  getLogining = function()
  {
    console.log("starting login");
    const email = document.getElementsByName("email")[0].value;
    const pass = document.getElementsByName("password")[0].value;
    let lgn = "attentionLogText";
    if(!validator.isEmail(email))
    {
      inlineEdit(lgn, "Неверная почта");
      return false;
    }
    if(pass<8)
    {
      inlineEdit(lgn, "Неверный пароль(менее 8ми символов)");
      return false;
    }

    axios.post('http://localhost:3001/login',{umail: email,
      upassword: pass,
      lkey: localStorage.getItem("cow-bull--login-key")
    })
    .then(res => inlineEdit(lgn, res.data.message))
    .catch(err => console.log(err));
  }

  render() {
    return(
      <>
        <p> Вход </p>
        <p id="attentionLogText"></p>
        <label htmlFor="email"> почта: </label>
        <input type="email" name="email"></input><br/>
        <label htmlFor="password"> пароль: </label>
        <input type="password" name="password"></input><br/>
        <button name="submitForm" className="submitForm" onClick={this.getLogining}> Войти </button>
      </>
    );
  }
}

export default MainMenuElements;