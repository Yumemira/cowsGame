import "./ProfileMenuStyle.css"
import axios from "axios"
import React from "react"
import MainMenuElements from "./MainMenuFrame"

export default class ProfileMenu extends React.Component
{
    constructor(props)
    {
        super(props)
        

        const queryParams = new URLSearchParams(window.location.search)
        const id = queryParams.get('id')

        this.state = {
            profileId: id,
            uname: ""
        }
        this.getUserProps = this.getUserProps.bind(this)
        this.profileGenerator = this.profileGenerator.bind(this)
        this.logoutUser = this.logoutUser.bind(this)  
    }

    getUserProps = (id) => {
        axios.post("http://192.168.1.3:3001/profile", {userid:id})
        .then((res) => {
            this.setState(() => ({
                uname: res.data.props
            }))
        })
    }

    logoutUser = () => {
    localStorage.removeItem("cow-bull--name")
    localStorage.removeItem("cow-bull--email")
    localStorage.removeItem("cow-bull--user-id")
    localStorage.removeItem("cow-bull--login-state")
    localStorage.removeItem("cow-bull--login-key")
    // отправлять на главную страничку после выхода
    window.location.assign("http://192.168.1.3:3000")
    }

    profileGenerator = () => {
        const elem = [7]
        elem[0] = (<div className="profile--block"><p id="main--header">Профиль</p></div>)
        
        elem[1] = (<div className="profile--block">
            <p id="profile--user-name">{this.state.uname}</p>
        </div>)

        elem[2] = (<div className="profile--block">
            <a href="" className="profile--button-friend">Добавить в друзья</a>
            <a href="" className="profile--button-friend">Написать сообщение</a>
        </div>)

        elem[3] = (<div className="profile--block">
            <a href="" className="profile--button">Достижения</a>
        </div>)
        
        elem[4] = (<div className="profile--block">
            <a href="#" className="profile--button">1437 ДД...</a>
        </div>)
        
        elem[5] = (<div className="profile--block">
            <a href="#" className="profile--button">Отсутствует</a>
        </div>)

        if(this.state.profileId===JSON.parse(localStorage.getItem("cow-bull--user-id")))
        {
            elem[6] = (
                <button onClick={this.logoutUser} id="profile--button-exit">Выйти</button>
            )
        }

        return elem
    }

    componentDidMount()
    {
        this.getUserProps(this.state.profileId)
    }

    render()
    {
        const menuRender = [2]
        const profileElements = (<main id="profile--content">{this.profileGenerator()}</main>)

        menuRender[0] = MainMenuElements()[0]
        menuRender[1] = profileElements
        return menuRender
    }
}