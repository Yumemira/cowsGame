import React from "react";
import MainMenuElements from "./MainMenuFrame";
import "./CreatePostStyle.css";
import axios from "axios";

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
        this.queryNewPost = this.queryNewPost.bind(this);
    }

    queryNewPost = () => {
        const data = {
            uid:this.state.uid,
            title:document.getElementById("post--title").value,
            text:document.getElementById("post--body").value,
            author:localStorage.getItem("cow-bull--name")
        };
        let i = 0;
        while(i< data.title.length)
        {
            if(data.text[i] === "<" || data.text[i] === ">") data.text[i] = '"';
            i++;
        }
        i = 0;
        while(i < data.text.length)
        {
            if(data.text[i] === "<" || data.text[i] === ">") data.text[i] = '"';
            i++;
        }
        console.log(data);

        if(data.author&&data.title.length>0&&data.title.length!=="Новая статья"&&data.text.length>0)
        {
            axios.post("http://localhost:3001/add-new-post",data)
            .then(res => {
                    if(res.data.message === "success")
                    {
                        window.location.assign('http://localhost:3000');
                    }
                    else
                    {
                        console.log(res.data.message);
                    }
                })
        }
        
    }

    render()
    {
        let elems = MainMenuElements();
        elems[1] = (
            <main id="main--object">
                <div key="h" className="main--block" id="main--header"><input className="post--block" type="text" id="post--title" defaultValue="Новая статья"></input></div>
                <div key="b" className="main--block" id="main--body">
                    <textarea className="post--block" id="post--body" type="text"></textarea>
                </div>
                <div key="f" className="main--block"><div id="post--button" onClick={this.queryNewPost}>Опубликовать пост</div></div>
            </main>
        );
        return elems;
    }
}