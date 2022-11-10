import React from "react";

export default class CommentConstructor extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            author: this.props.authorProps,
            text: this.props.textData
        };
    }

    render()
    {
        return(
            <div className="comment--body">
                <h1 className="comment--author-name">{this.state.author.name}</h1>
                <p className="comment--text">{this.state.text}</p>
            </div>
        );
    }
}