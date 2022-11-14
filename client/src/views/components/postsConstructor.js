import React from "react";
import './postStyle.css';
import CommentConstructor from "./commentsConstructor";

export default class PostConstructor extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id: this.props.postId,
            isOpened: false,
            isComments: false,
            header: this.props.titleName,
            hashTags: this.props?.postHashTags,
            text: this.props.textData,
            author: this.props?.textAuthor,
            comments: []
        };
        this.showPost = this.showPost.bind(this);
        this.GetComments = this.GetComments.bind(this);
        this.showComms = this.showComms.bind(this);
    }

    GetComments = function(comProp)
    {
        let authorCreate = {
            name: "David",
            id: comProp.postId
        };
        let textCom = "helloThere";

        let commentsList = <CommentConstructor authorProps={authorCreate} textData={textCom} />;
        return (<div className="post--comments-part">
            {commentsList}
            <input type="text" name="comment--input" defaultValue="введите комментарий..."></input>
            <button name="comment--send">{">>"}</button>
        </div>);
    }

    showPost = function()
    {
        this.setState(prevState => ({
            isOpened:!prevState.isOpened
        }));
    }

    showComms = function()
    {
        this.setState(prevState => ({
            isComments:!prevState.isComments
        }));
    }

    render()
    {
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
                    {this.state.isComments ? <this.GetComments postId='1'/> : null}
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
                    {this.state.isComments ? <this.GetComments postId='1'/> : null}
                </div>
                );
        }

        return elem;
    }
}