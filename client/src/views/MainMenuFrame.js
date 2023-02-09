import './MainMenuStyle.css'
import React from 'react'
import classnames from "classnames"
import axios from "axios"
import validator from "validator"

function MainMenuElements()
{
  
  const elems = [3]
  
  elems[0] = (
    <footer id="footer--main">
        <nav id='footer--nav'>
          <section id='footer--links'>
            <a href='/game-prepare'className="refButtons" key="p">Игра</a>
            <a href='/' className="refButtons" key="n">Новости</a>
            <a href='/forum' className="refButtons" key="f">Форум</a>
            <a href='/about' className="refButtons" key="a">О проекте</a>
          </section>
          <Toggle />
        </nav>
    </footer>
  )
  elems[1] = (
    <main id='table--content'>
      
    </main>
  )
  
  elems[2] = (
    <section id='table--profile'>
      
    </section>
  )

  return elems
}


class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggleOn: false,
      isRegisterOn: true,
      toggleButtonText: "Вход"
    }

    this.handleClick = this.handleClick.bind(this)
    this.changeFieldset = this.changeFieldset.bind(this)
    this.intoProfile = this.intoProfile.bind(this)
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  intoProfile = () => {
    return "/profile?id=" + JSON.parse(localStorage.getItem("cow-bull--user-id"))
  }

  changeFieldset = () => {
    let texting
    if(this.state.isRegisterOn)
    {
      texting = "Регистрация"
    }
    else
    {
      texting = "Вход"
    }

    this.setState(prevState => ({
      isRegisterOn: !prevState.isRegisterOn,
      toggleButtonText: texting
    }))
  }

  render() {
    if(false|JSON.parse(localStorage.getItem("cow-bull--login-state")))
    {
      const hrefLink = this.intoProfile()
      return (
        <div className='div--inline' id='button--profile'>
          <a className="refButtons" href={hrefLink}>{JSON.parse(localStorage.getItem("cow-bull--name"))}  </a>
        </div>
      )
    }

    let fieldSet

    if(this.state.isRegisterOn)
    {
      fieldSet = <RegisterField />
    }
    else
    {
      fieldSet = <LoginField />
    }
    
    return (
        <div>
          <button id="inlineText" onClick={this.handleClick}> Войти </button>
          <section id="loginMenu" className={classnames("--visibled", {
              "--hidden": !this.state.isToggleOn
            })}>
            <div id="logregField">
              <input type='button' value={this.state.toggleButtonText} onClick={this.changeFieldset}></input>
              {fieldSet}
            </div>
          </section>
        </div>
      )
  }
}

class RegisterField extends React.Component
{

  constructor(props)
  {
    super(props)
    this.getRegistered = this.getRegistered.bind(this)
  }

  getRegistered = function()
  {
    const username = document.getElementsByName("username")[0].value
    const useremail = document.getElementsByName("email")[0].value
    const userpassword = document.getElementsByName("password")[0].value
    const userRepeatPassword = document.getElementsByName("repeatPassword")[0].value

    if(checkedData(username, useremail, userpassword, userRepeatPassword))
    {

      axios.post('http://192.168.1.3:3001/register',{uname: username,
      umail: useremail,
      upassword: userpassword})
      .then((res) => {
        inlineEdit("attentionRegText", res.data.message)
        if(res.data.success)
        {
          if(window.confirm("Сохранить данные для входа?"))
          {
            localStorage.setItem("cow-bull--prefemail", JSON.stringify(useremail))
          }
          
          localStorage.setItem("cow-bull--name", JSON.stringify(username))
          localStorage.setItem("cow-bull--email", JSON.stringify(useremail))

          localStorage.setItem("cow-bull--user-id", JSON.stringify(res.data.userid))
          localStorage.setItem("cow-bull--login-state", JSON.stringify(true))
          localStorage.setItem("cow-bull--login-key", JSON.stringify(res.data.lkey))
          window.location.reload()
        }
      })
      .catch(err => console.log(err))
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
    )
  }
}



function inlineEdit(fieldId, textMessage)
{
  document.getElementById(fieldId).innerText = textMessage
}

function checkedData(uname, email, pass, repeatpass)
{
  let fid = "attentionRegText"

  if(uname.length > 10)
  {
    inlineEdit(fid, "Имя должно быть не длиннее 10ти символов")
    return false
  }
  if(email.length > 50)
  {
    inlineEdit(fid, "Слишком длинный адрес почты")
    return false
  }
  if(pass.length > 30)
  {
    inlineEdit(fid, "Слишком длинный пароль")
    return false
  }

  let i = 0
  while(i < uname.length)
  {
    if(uname[i] === "<" || uname[i] === ">")
    {
      inlineEdit(fid, "Недопустимый символ в имени")
      return false
    }
    i++
  }
  i = 0
  while(i < email.length)
  {
    if(email[i] === "<" || email[i] === ">")
    {
      inlineEdit(fid, "Недопустимый символ в почте")
      return false
    }
    i++
  }
  if(uname.length < 3)
  {
    inlineEdit(fid, "Имя должно быть не короче трёх символов")
    return false
  }
  if(pass.length < 8)
  {
    inlineEdit(fid, "Пароль должен иметь длину не менее 8 символов")
    return false
  }
  if(pass !== repeatpass)
  {
    inlineEdit(fid, "Пароли не совпадают")
    return false
  }
  if(!validator.isEmail(email))
  {
    inlineEdit(fid, "Неверная почта")
    return false
  }

  return true
}


class LoginField extends React.Component
{
  constructor(props)
  {
    super(props)
    this.getLogining = this.getLogining.bind(this)
  }
  getLogining = function()
  {
    const email = document.getElementsByName("email")[0].value
    const pass = document.getElementsByName("password")[0].value
    let lgn = "attentionLogText"

    if(!validator.isEmail(email))
    {
      inlineEdit(lgn, "Неверная почта")
      return false
    }
    if(email.length>50)
    {
      inlineEdit(lgn, "Почта слишком длинная")
      return false
    }
    if(pass.length>30)
    {
      inlineEdit(lgn, "Неверный пароль(более 30ти символов)")
      return false
    }
    if(pass.length<8)
    {
      inlineEdit(lgn, "Неверный пароль(менее 8ми символов)")
      return false
    }

    axios.post('http://192.168.1.3:3001/login',{umail: email,
      upassword: pass,
      lkey: JSON.parse(localStorage.getItem("cow-bull--login-key"))
    })
    .then(res => {
      inlineEdit(lgn, res.data.message)
      if(res.data.message === "Успешный вход")
      {
        if(window.confirm("Сохранить данные для входа?"))
        {
          localStorage.setItem("cow-bull--prefemail", JSON.stringify(email))
        }      
        localStorage.setItem("cow-bull--name", JSON.stringify(res.data.name))
        localStorage.setItem("cow-bull--email", JSON.stringify(email))
        localStorage.setItem("cow-bull--user-id", JSON.stringify(res.data.uid))
        localStorage.setItem("cow-bull--login-state", JSON.stringify(true))
        localStorage.setItem("cow-bull--login-key", JSON.stringify(res.data.lkey)) // необходимо изменить позднее в функцию валидации логина

        window.location.reload()
    }
    })
    .catch(err => console.log(err))
  }

  render() {
    return(
      <>
        <p> Вход </p>
        <p id="attentionLogText"></p>
        <label htmlFor="email"> почта: </label>
        <input type="email" name="email" defaultValue={JSON.parse(localStorage.getItem("cow-bull--prefemail"))}></input><br/>
        <label htmlFor="password"> пароль: </label>
        <input type="password" name="password"></input><br/>
        <button name="submitForm" className="submitForm" onClick={this.getLogining}> Войти </button>
      </>
    )
  }
}

class AccountSection extends React.Component
{
  
}

export default MainMenuElements