import React from "react";
import './postStyle.css';
import CommentConstructor from "./commentsConstructor";
import axios from "axios";

export default class PostConstructor extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id: this.props.idPost,
            isOpened: false,
            isComments: false,
            header: this.props.titleName,
            text: this.props.textData,
            author: this.props?.textAuthor,
            authorId:this.props?.authorId,
            socket: this.props.setSocket,
            comments: []
        };
        this.showPost = this.showPost.bind(this);
        this.commentSend = this.commentSend.bind(this);
        this.showComms = this.showComms.bind(this);
        this.openComms = this.openComms.bind(this);
        this.fetchingComments = this.fetchingComments.bind(this);
    }

    fetchingComments = function()
    {
        
    }

    commentSend = () => {
        const dataList = {
            postId: this.state.id,
            id: localStorage.getItem("cow-bull--user-id"),
            textData: document.getElementById("comment--data").value,
            author: localStorage.getItem("cow-bull--name")
        }

        axios.post("http://localhost:3001/comment--send", dataList)
        .then((res) => {
            if(res.data.message==="success")
            {
                //TODO: Rerender comments while open
            }
        })
    }

    openComms = function(){
        if(this.state.isComments)
        {
            const userProps = {
                postId: this.state.id,
                username:localStorage.getItem("cow-bull--name"),
                userId: localStorage.getItem("cow-bull--user-id")
            };
//                this.state.socket.emit('chat_enable',userProps);
            console.log(this.state.comments);
            return (<div className="post--comments-part">
                {this.state.comments}
                <input type="text" name="comment--input" id="comment--data" defaultValue="введите комментарий..."></input>
                <button name="comment--send" onClick={this.commentSend}>{">>"}</button>
            </div>);
        }
        else
        {
            return null;
        }
    }

    showPost = function()
    {
        this.setState(prevState => ({
            isOpened:!prevState.isOpened
        }));
    }

    showComms = function()
    {
        if(!this.state.isComments)
        {
            axios.post("http://localhost:3001/comments-fetch", {postId: this.state.id})
            .then((res) => {
                console.log(res.data.comList);
                if(res.data.message === "success")
                {
                    
                    let commentList = [res.data.comList.length];
                    for(let i = 0; i < res.data.comList.length; i++)
                    {
                        const authProps = {
                            name: res.data.comList[i].username,
                            id: res.data.comList[i].userid
                        }
                        console.log(res.data.comList);
                        commentList[i] = (<CommentConstructor authorProps={authProps} textData={res.data.comList[i].data} />);
                    }
                    this.setState(() => ({
                        comments: commentList,
                        isComments:true
                    }));
                    console.log(commentList);
                }
                else
                {
                    this.setState(() => ({
                        isComments: true
                    }));
                }
            });
        }
        else
        {
            this.setState(() => ({
                isComments: false
            }));
        }
    }

    render()
    {
        const commentList = this.openComms()
        var elem;
        if(this.state.isOpened)
        {
            elem = (
                <div className="post--container">
                    <div className="post--body" onClick={this.showPost}>
                        <header className="post--title">{this.state.header}</header>
                        <h1 className="post--tags">{this.state.hashTags}</h1>
                        <p className="post--body">{this.state.text}</p>
                    </div>
                    <button className="post--button">Лайк</button>
                    <button className="post--button" onClick={this.showComms}>Комм</button>
                    {commentList}
                </div>
                );
        }
        else
        {
            elem = (
                <div className="post--container">
                    <div className="post--body" onClick={this.showPost}>
                        <h1 className="post--title">{this.state.header}</h1>
                        <header className="post--tags">{this.state.hashTags}</header>
                        <p className="post--body">{this.state.text.substring(0,100) + "..."}</p>
                    </div>
                    <button className="post--button">Лайк</button>
                    <button className="post--button" onClick={this.showComms}>Комм</button>
                    {commentList}
                </div>
                );
        }

        return elem;
    }
}