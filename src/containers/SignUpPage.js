import React from 'react';
import SignupForm from '../components/SignUpForm';

class SignUpPage extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm (event)
    {
        event.preventDefault();
        // console.log('name:', this.state.user.name);
        // console.log('email:', this.state.user.email);
        // console.log('password:', this.state.user.password);

        const name = encodeURIComponent(this.state.user.name)
        const email = encodeURIComponent(this.state.user.email)
        const password = encodeURIComponent(this.state.user.password)

        var headers = new Headers();
        headers.append("Accept", "application/json, text/plain, */*");
        headers.append("Content-Type", "application/json");
        var payload = {
            name: name,
            email: email,
            password: password
        };

        fetch(
            process.env.REACT_APP_PUBLIC_API + "/users/signup",
            {
                method: 'POST',
                headers: headers,
                mode: 'cors',
                body: JSON.stringify(payload)
            })
            .then(function(response){
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("Something has happened");
                }
            })
            .then(user => console.log(user))
            .catch(function (error) {
                console.log("There has been a problem with fetching: " + error.message)
            })
    }

    changeUser (event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        })
    }

    render() {
        return (
            <SignupForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            >
            </SignupForm>
        )
    }
}

export default SignUpPage;