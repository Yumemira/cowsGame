import './MainMenuStyle.css'
import React from 'react'
import classnames from "classnames"
import axios from "axios"
import validator from "validator"
import InputElement from './components/elementsContainer'

function MainMenuElements()
{
  
  const elems = [3]
  
  elems[0] = <ButtonProfile />
  elems[1] = (
    <main id='table--content'>
      
    </main>
  )
  
  if(JSON.parse(localStorage.getItem("cow-bull--login-state")))
  {
    elems[2] = (
      <section id='table--profile'>
        
      </section>
    )
  }

  return elems
}


class ButtonProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldSet:(<></>),
      isToggleOn: false,
      isRegisterOn: false,
      toggleButtonText: "Регистрация"
    }

    this.handleClick = this.handleClick.bind(this)
    this.changeFieldset = this.changeFieldset.bind(this)
    this.intoProfile = this.intoProfile.bind(this)
  }

  handleClick = () => {
    if(this.state.isToggleOn)
    {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn,
        fieldSet: <></>
      }))
    }
    else
    {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn,
        fieldSet: prevState.isRegisterOn? <RegisterField /> : <LoginField />
      }))
    }
  }

  intoProfile = () => {
    return "/profile?id=" + JSON.parse(localStorage.getItem("cow-bull--user-id"))
  }

  changeFieldset = () => {
    if(this.state.isRegisterOn)
    {
      this.setState(prevState => ({
        isRegisterOn: !prevState.isRegisterOn,
        toggleButtonText: "Регистрация",
        fieldSet: <LoginField />
      }))
    }
    else
    {
      this.setState(prevState => ({
        isRegisterOn: !prevState.isRegisterOn,
        toggleButtonText: "Вход",
        fieldSet: <RegisterField />
      }))

    }
  }

  render() {
    if(false|JSON.parse(localStorage.getItem("cow-bull--login-state")))
    {
      const hrefLink = this.intoProfile()

      return (
        <section id="footer--main">
            <nav id='footer--nav'>
              <section id='footer--links'>
                <a href='/game-prepare'className="refButtons" key="p">Игра</a>
                <a href='/' className="refButtons" key="n">Новости</a>
                <a href='/forum' className="refButtons" key="f">Форум</a>
                <a href='/about' className="refButtons" key="a">О проекте</a>
              </section>
              <a id='button--profile' href={hrefLink}>{JSON.parse(localStorage.getItem("cow-bull--name"))}  </a>
            </nav>
        </section>
      )
    }
    
    return (
      <>
        <section id="footer--main">
          <nav id='footer--nav'>
            <section id='footer--links'>
              <a href='/game-prepare'className="refButtons" key="p">Игра</a>
              <a href='/' className="refButtons" key="n">Новости</a>
              <a href='/forum' className="refButtons" key="f">Форум</a>
              <a href='/about' className="refButtons" key="a">О проекте</a>
            </section>
            <button id="inlineText" onClick={this.handleClick}> Войти </button>
          </nav>
        </section>
        <div id="loginMenu" className={classnames("--visibled", {
            "--hidden": !this.state.isToggleOn
          })}>
          <div id="logregField">
              {this.state.fieldSet}
              <input type='button' className='login-menu--button' value={this.state.toggleButtonText} onClick={this.changeFieldset}></input>
          </div>
        </div>
      </>
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
      <section id='logreg--position'>
        <p id ="attentionRegText"></p>
        <InputElement mclass='input--label' buttonName='Почта' itype='email' iname='email' elclass='input--field' />
        <InputElement mclass='input--label' buttonName='Имя' itype='text' iname='username' elclass='input--field' />
        <InputElement mclass='input--label' buttonName='Пароль' itype='password' iname='password' elclass='input--field' />
        <InputElement mclass='input--label' buttonName='Повтор пароля' itype='password' iname='repeatPassword' elclass='input--field' />
        <button name="submitForm" className='login-menu--button' onClick={this.getRegistered}> Зарегистрироваться </button>
      </section>
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
      <section id="logreg--position">
        <p id="attentionLogText"></p>
        <InputElement mclass='input--label' buttonName='Почта' itype='email' iname='email' elclass='input--field' dValue={JSON.parse(localStorage.getItem("cow-bull--prefemail"))} />
        <InputElement mclass='input--label' buttonName='Пароль' itype='password' iname='password' elclass='input--field' />
        <button name="submitForm" className='login-menu--button' onClick={this.getLogining}> Войти </button>
      </section>
    )
  }
}



export default MainMenuElements