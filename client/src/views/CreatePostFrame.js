import React from "react";
import MainMenuElements from "./MainMenuFrame";
import "./CreatePostStyle.css";

export default class CreatePost extends React.Component
{
    constructor(props)
    {
        super(props);
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        this.state = {
            uid: id,
            uname:"",
            umail:""
        };
    }

    render()
    {
        let elems = MainMenuElements();
        elems[1] = (
            <main id="main--object">
                <div key="h" className="main--block" id="main--header"><input className="post--block" type="text" id="post--title" defaultValue="Новая статья"></input></div>
                <div key="b" className="main--block" id="main--body">
                    <section className="post--block">
                        <label htmlFor="post--tags" key="l">Введите теги:</label>
                        <input id="post--tags" type="text" key="i"></input>
                    </section>
                    <textarea className="post--block" id="post--body" type="text"></textarea>
                </div>
                <div key="f" className="main--block"><div id="post--button">Опубликовать пост</div></div>
            </main>
        );
        return elems;
    }
}