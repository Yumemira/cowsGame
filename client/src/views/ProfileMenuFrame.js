import "./ProfileMenuStyle.css";
import axios from "axios";
import React from "react";
import MainMenuElements from "./MainMenuFrame";

export default class ProfileMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        

        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');

        this.state = {
            profileId: id,
            uname: ""
        }
        this.getUserProps = this.getUserProps.bind(this);
        this.profileGenerator = this.profileGenerator.bind(this);
    }

    getUserProps = (id) => {
        axios.post("http://localhost:3001/profile", {userid:id})
        .then((res) => {
            this.setState(() => ({
                uname: res.data.props
            }));
        });
    }

    profileGenerator = () => {
        const elem = [6];
        elem[0] = (<div className="profile--block"><p id="main--header">Профиль</p></div>);
        elem[1] = (<div className="profile--block">
            <p id="profile--user-name">{this.state.uname}</p>
        </div>);
        elem[2] = (<div className="profile--block">
            <a href="" className="profile--button">Добавить в друзья</a>
            <a href="" className="profile--button">Написать сообщение</a>
        </div>
        );
        elem[3] = (<div className="profile--block">
            <a href="" className="profile--button">Достижения</a>
        </div>);
        elem[4] = (<div className="profile--block">
            <a href="#" className="profile--button">1437 ДД...</a>
        </div>
        );
        elem[5] = (<div className="profile--block">
            <a href="#" className="profile--button">Отсутствует</a>
        </div>);

        return elem;
    }

    componentDidMount()
    {
        this.getUserProps(this.state.profileId);
        
    }

    render()
    {
        const menuRender = [2];
        const profileElements = (<main id="profile--main">{this.profileGenerator()}</main>);

        menuRender[0] = MainMenuElements()[0];
        menuRender[1] = profileElements;
        return menuRender;
    }
}