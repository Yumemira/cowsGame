import React from "react"
import MainMenuElements from "./MainMenuFrame"
import "./CreatePostStyle.css"
import axios from "axios"

export default class CreatePost extends React.Component
{
    constructor(props)
    {
        super(props)
        const queryParams = new URLSearchParams(window.location.search)
        const id = queryParams.get('id')
        this.state = {
            uid: id,
            uname:"",
            umail:""
        }
        this.queryNewPost = this.queryNewPost.bind(this)
        this.errMessageWrite = this.errMessageWrite.bind(this)
    }

    queryNewPost = () => {
        const data = {
            uid: this.state.uid,
            title: document.getElementById("post--title").value,
            text: document.getElementById("post--body").value,
            author: JSON.parse(localStorage.getItem("cow-bull--name"))
        }

        let i = 0
        while(i < data.title.length)
        {
            if(data.title[i] === "<" || data.title[i] === ">")
            {
                this.errMessageWrite("Использованы запрещённые символы в названии(>,<)")
                return false
            }
            i++
        }
        
        i = 0
        while(i < data.text.length)
        {
            if(data.text[i] === "<" || data.text[i] === ">")
            {
                this.errMessageWrite("использованы запрещённые символы в тексте(>,<)")
            }
            i++
        }

        if(data.title.length===0)
        {
            this.errMessageWrite("Заголовок не должен быть пустым")
            return false
        }
        if(data.title==="Новая статья")
        {
            this.errMessageWrite("Переименуйте заголовок")
            return false
        }
        if(data.text.length===0)
        {
            this.errMessageWrite("Текст не может быть пустым")
            return false
        }
        if(data.author)
        {
            axios.post("http://192.168.1.3:3001/add-new-post", data)
            .then(res => {
                    if(res.data.message === "success")
                    {
                        window.location.assign('http://192.168.1.3:3000/forum')
                    }
                    else
                    {
                        console.log(res.data.message)
                    }
                })
        }
        else
        {
            this.errMessageWrite("Ошибка добавления поста, попробуйте перезагрузить страницу(внимание, данные не сохранятся)")
        }
        
    }

    errMessageWrite = (msg) => {
        let econ = document.getElementById("post--console")
        econ.innerText = msg
    }

    render()
    {
        let elems = [2]
        elems[0] = MainMenuElements()[0]
        elems[1] = (
            <main id="main--object">
                <div id="main--header"><p id="post--console"></p></div>
                <div className="main--block">
                    <input type="text" id="post--title" defaultValue="Новая статья"></input>
                </div>
                <div className="main--block">
                    <textarea id="post--body" type="text"></textarea>
                </div>
                <button id="post--button" onClick={this.queryNewPost}>Опубликовать пост</button>
            </main>
        )
        return elems
    }
}