import axios from "axios";
import React from "react";

export default class ProfileMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        

        this.getUserProps = this.getUserProps.bind(this);
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        const uprops = this.getUserProps(id);

        this.state = {
            profileId: id,
            uname: uprops.name
        }
    }

    getUserProps = (id) => {
        axios.post("http://localhost:3001/profile", {userid:id})
        .then((res) => {
            return res.data.props;
        });
    }

    render()
    {
        return (
            <div>
                <p>Hi!</p>
            </div>
        );
    }
}