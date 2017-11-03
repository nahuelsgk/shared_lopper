import React from 'react';
import LoginForm from '../components/LoginForm';
import Auth from '../modules/Auth';
import {withRouter} from 'react-router'
import axios from 'axios';

class LoginPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            errors: {},
            user: {
                email: '',
                pasword: ''
            }
        };
        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        // console.log('email:', this.state.user.email);
        // console.log('password:', this.state.user.password);

        const email = encodeURIComponent(this.state.user.email)
        const password = encodeURIComponent(this.state.user.password)

        var payload = {
            email: email,
            password: password
        };
        axios
            .post(process.env.REACT_APP_PUBLIC_API + "/users/login", payload)
            .then(response => {Auth.authenticateUser(response.data.token);})
            .then((function () {this.props.history.push('/dashboard');}).bind(this))
            .catch(error => {console.log("There has been a problem with fetching: " + error.message);})
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    render() {
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }
}

export default withRouter(LoginPage);
