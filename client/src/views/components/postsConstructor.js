import React, { useState, useEffect, useContext } from "react"
import './postStyle.css'
import CommentConstructor from "./commentsConstructor"
import axios from "axios"
import {SocketContext} from "./socket"


const MessagesCollection = ({user, room}) => {
    const socket = useContext(SocketContext)

    const [comments, setComments] = useState([])


    
    
    const fetchComment = (commentId) => {
        axios.post("http://192.168.1.3:3001/comment-fetch", {commentId:commentId})
            .then((ares) => {
                const comm = ares.data.comment
                
                const authProps = {
                    name: comm.username,
                    id: comm.userid
                }
                let addedComm = (<CommentConstructor authorProps={authProps} textData={comm.data} />)

                setComments([...comments, addedComm])
            })
    }
    
    const updateComms = (comId) => {
        socket.emit('send_comment', { commentid: comId, room: room })

        fetchComment(comId)
    }

    const commentSend = () => {
        const dataList = {
            postId: room,
            id: user,
            textData: document.getElementById(`comment--data&${room}`).value,
            author: JSON.parse(localStorage.getItem("cow-bull--name")),
            valid: JSON.parse(localStorage.getItem("cow-bull--login-key"))
        }
        
        if(JSON.parse(localStorage.getItem("cow-bull--login-state")))
        {
            axios.post("http://192.168.1.3:3001/comment--send", dataList)
            .then((res) => {
                if(res.data.message==="success")
                {
                    updateComms(res.data.comId)
                }
            })
        }
        else
        {
            window.alert("Пожалуйста, войдите в аккаунт для написания комментария.")
        }

    }

    axios.post("http://192.168.1.3:3001/comments-fetch", {postId: room})
    .then((res) => {
        if(res.data.message === "success")
        {
            
            let commentList = [res.data.comList.length]
            for(let i = 0; i < res.data.comList.length; i++)
            {
                const authProps = {
                    name: res.data.comList[i].username,
                    id: res.data.comList[i].userid
                }
                commentList[i] = (<CommentConstructor authorProps={authProps} textData={res.data.comList[i].data}/>)
            }
            setComments(commentList)
        }
        else
        {
            //Error notification
        }
    })

    
    useEffect(() => {
        socket.emit('join_room', { userid: user, room: room })

        socket.on('update_comments', (data) => {
            const {comment} = data
            fetchComment(comment)
        });

        return () => {
            socket.off('update_comments', (data) => {
                const {comment} = data
                fetchComment(comment)
            });
        }
    },[socket])

    return (<div className="post--comments-part">
            {comments}
            <input type="text" name="comment--input" id={`comment--data&${room}`} defaultValue="введите комментарий..."></input>
            <button name="comment--send" onClick={commentSend}>{">>"}</button>
        </div>)
    
}

export default class PostConstructor extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.idPost,
            isOpened: false,
            isComments: false,
            header: this.props.titleName,
            text: this.props.textData,
            author: this.props.textAuthor,
            authorId:this.props.authorId
        }
        this.showPost = this.showPost.bind(this)
        this.openComms = this.openComms.bind(this)
    }

    
    openComms = function(){
        this.setState(prevState => ({
            isComments:!prevState.isComments
        }))
    }

    showPost = function()
    {
        this.setState(prevState => ({
            isOpened:!prevState.isOpened
        }))
    }

    

    render()
    {
        var elem
        
        if(this.state.isOpened)
        {
            elem = (
                <div className="post--container">
                    <section className="post--body" onClick={this.showPost}>
                        <h1 className="post--title">{this.state.header}</h1>
                        <p className="post--body">{this.state.text}</p>
                    </section>
                    <section className="post--footer">
                        <button className="post--button-like"></button>
                        <button className="post--button-comm" onClick={this.openComms}></button>
                    </section>
                    {this.state.isComments ? <MessagesCollection user={JSON.parse(localStorage.getItem("cow-bull--user-id"))} room={this.state.id}/> : null}
                </div>
                )
        }
        else
        {
            elem = (
                <div className="post--container">
                    <section className="post--body" onClick={this.showPost}>
                        <h1 className="post--title">{this.state.header}</h1>
                        <p className="post--body">{this.state.text.substring(0,1000) + "..."}</p>
                    </section>
                    <section className="post--footer">
                        <button className="post--button-like"></button>
                        <button className="post--button-comm" onClick={this.openComms}></button>
                    </section>
                    {this.state.isComments ? <MessagesCollection user={JSON.parse(localStorage.getItem("cow-bull--user-id"))} room={this.state.id}/> : null}
                </div>
                )
        }

        return elem
    }
}