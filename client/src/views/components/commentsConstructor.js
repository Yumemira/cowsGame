import React from "react"
import './commentsStyle.css'


export default class CommentConstructor extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            author: this.props.authorProps,
            text: this.props.textData
        };
        this.openProfile = this.openProfile.bind(this)
    }

    openProfile = () => {
        window.location.assign("/profile?id=" + this.state.author.id)
    }

    render()
    {
        return(
            <div className="comment--body">
                <header className="comment--author-name" onClick={this.openProfile}>{this.state.author.name}</header>
                <p className="comment--text">{this.state.text}</p>
            </div>
        );
    }
}