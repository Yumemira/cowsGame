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
            socket: this.props.socket,
            comments: []
        };
        this.showPost = this.showPost.bind(this)
        this.commentSend = this.commentSend.bind(this)
        this.showComms = this.showComms.bind(this)
        this.openComms = this.openComms.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
        this.fetchComms = this.fetchComms.bind(this)
        this.fetchComment = this.fetchComment.bind(this)
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
                this.updateComms(res.data.comId);
            }
        })
    }

    
    joinRoom = () => {
        this.state.socket.emit('join_room', { userid: localStorage.getItem("cow-bull--user-id"), room: this.state.id });
    }
    
    leaveRoom = () => {
        this.state.socket.emit('leave_room', { userid: localStorage.getItem("cow-bull--user-id"), room: this.state.id });
    }

    updateComms = (comId) => {
        this.state.socket.emit('send_comment', { commentid: comId, room: this.state.id });    
    }

    fetchComms = () => {
        this.state.socket.on('update_comments', (res) => {
            const {commentId} = res
            this.fetchComment()
        });
    }

    fetchComment = (commentId) => {
        axios.post("http://localhost:3001/comment-fetch", commentId)
            .then((ares) => {
                const {comm} = ares.data.comment
                const authProps = {
                    name: comm.username,
                    id: comm.userid
                }
                let addedComm = (<CommentConstructor authorProps={authProps} textData={comm.data} />);

                this.state.comments = this.state.comments.concat(addedComm)
            });
            
    }

    openComms = function(){
        if(this.state.isComments)
        {
            const userProps = {
                postId: this.state.id,
                username:localStorage.getItem("cow-bull--name"),
                userId: localStorage.getItem("cow-bull--user-id")
            };
            

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
            this.joinRoom()

            axios.post("http://localhost:3001/comments-fetch", {postId: this.state.id})
            .then((res) => {
                if(res.data.message === "success")
                {
                    
                    let commentList = [res.data.comList.length];
                    for(let i = 0; i < res.data.comList.length; i++)
                    {
                        const authProps = {
                            name: res.data.comList[i].username,
                            id: res.data.comList[i].userid
                        }
                        commentList[i] = (<CommentConstructor authorProps={authProps} textData={res.data.comList[i].data} />);
                    }
                    this.setState(() => ({
                        comments: commentList,
                        isComments:true
                    }));
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
            this.leaveRoom()
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