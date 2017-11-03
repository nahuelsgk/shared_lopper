import React from 'react';
import {withRouter} from 'react-router';
import Auth from '../modules/Auth'

class Logout extends React.Component
{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Auth.deauthenticateUser();
        this.props.history.push('/login')
    }

    render() {
        return (<div/>)
    }
}

export default withRouter(Logout)
