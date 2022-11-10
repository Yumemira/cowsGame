import React from "react";
import './postStyle.css';
import CommentConstructor from "./commentsConstructor";

export default class PostConstructor extends React.Component
{
    constructor(props)
    {
        super(props);
        let commentsList = getComments(this.props.idPost);
        this.state = {
            isOpened: false,
            header: this.props.titleName,
            hashTags: this.props?.postHashTags,
            text: this.props.textData,
            author: this.props?.textAuthor,
            comments: commentsList
        };
        this.showPost = this.showPost.bind(this);
    }

    showPost = function()
    {
        console.log("it works");
        this.setState(prevState => ({
            isOpened:!prevState.isOpened
        }));
    }

    render()
    {
        var elem;
        if(this.state.isOpened)
        {
            elem = (
                <div className="post--container" onClick={this.showPost}>
                    <header className="post--title">{this.state.header}</header>
                    <h1 className="post--tags">{this.state.hashTags}</h1>
                    <p className="post--body">{this.state.text}</p>
                    <button className="post--button">Лайк</button>
                    <button className="post--button">Комм</button>
                </div>
                );
        }
        else
        {
            elem = (
                <div className="post--container" onClick={this.showPost}>
                    <header className="post--title">{this.state.header}</header>
                    <h1 className="post--tags">{this.state.hashTags}</h1>
                    <p className="post--body">{this.state.text.substring(0,100) + "..."}</p>
                    <button className="post--button">Лайк</button>
                    <button className="post--button">Комм</button>
                </div>
                );
        }

        return elem;
    }
}

function getComments(postId)
{
    let authorCreate = {
        name: "David",
        id: "1324"
    };

    let commentsList = <CommentConstructor authorProps={authorCreate} textData="helloThere" />;
    return (<div className="post--comments-part">
        {commentsList}
    </div>);
}