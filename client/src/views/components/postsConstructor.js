import React, { useState, useEffect, useContext } from "react"
import './postStyle.css'
import CommentConstructor from "./commentsConstructor"
import axios from "axios"
import {SocketContext} from "./socket"
import InputElement from "./elementsContainer"


const MessagesCollection = ({user, room}) => {
    var uncheckedComs
    var commrow = []

    const [initstate, setInitstate] = useState(false)
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

    const loadComms = (initValue, currentStep) => {

        let commentList = [currentStep]
        console.log(initValue)
        
        for(let i = initValue; i < currentStep; i++)
        {
            const authProps = {
                name: commrow[i].username,
                id: commrow[i].userid
            }
            commentList[i-initValue] = (<CommentConstructor authorProps={authProps} textData={commrow[i].data}/>)
        }
        setComments(commentList.concat(comments))
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
            document.getElementById(`comment--data&${room}`).value=''

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

    //set on initial loading!
    if(!initstate)
    {
    axios.post("http://192.168.1.3:3001/comments-fetch", {postId: room})
    .then((res) => {
        if(res.data.message === "success")
        {
            commrow = res.data.comList

            if(commrow.length < 20)
            {
                loadComms(0, commrow.length)
            }
            else
            {
                loadComms(commrow.length-20, commrow.length)
            }
            
        }
        else
        {
            //Error notification
        }
    })
    
    setInitstate(true)
    }
    
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

    const loadMore = () => {
        loadComms(comments.length-uncheckedComs,comments.length)
    }

    uncheckedComs = commrow.length - comments.length
    console.log(uncheckedComs)
    return (<div className="post--comments-part">
        {uncheckedComs>0 ? <button onClick={loadMore}>Показать ещё {uncheckedComs}</button> : null}
            {comments}
            <div className="comment--section">
                <InputElement mclass='input--comm-sender' buttonName="введите комментарий..." itype="text" iname="comment--input" elclass="comment--input" elid={`comment--data&${room}`} />
                <button name="comment--send" className="comment--send" onClick={commentSend}>{">>"}</button>
            </div>
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
        
        if(this.state.isOpened||this.state.text.length<500)
        {
            elem = (
                <div className="post--container">
                    <section className="post--body">
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
                    <section className="post--body" >
                        <h1 className="post--title">{this.state.header}</h1>
                        <p className="post--body">{this.state.text.substring(0,500)}<div className="open--post" onClick={this.showPost}>читать полностью...</div></p>
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