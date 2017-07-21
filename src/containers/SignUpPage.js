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
        console.log('name:', this.state.user.name);
        console.log('email:', this.state.user.email);
        console.log('password:', this.state.user.password);
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