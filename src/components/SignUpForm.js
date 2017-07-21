import React, {PropTypes} from 'react';
import {Card, CardText} from 'material-ui/Card';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SignUpForm extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let onSubmit = this.props.onSubmit;
        let errors   = this.props.errors;
        let user     = this.props.user;
        let onChange = this.props.onChange;

        return (
            <Card className="container">
                <form action="/" onSubmit={onSubmit}>
                    <h2 className="card-heading">Sign Up</h2>

                    {errors.summary && <p className="error-message"> errors.summary </p>}

                    <div className="field-line">
                        <TextField
                            floatingLabelText="Name"
                            name="name"
                            errorText={errors.name}
                            onChange={onChange}
                            value={user.name}
                            />
                    </div>
                    <div className="field-line">
                        <TextField
                            floatingLabelText="Email"
                            name="email"
                            errorText={errors.email}
                            onChange={onChange}
                            value={user.email}
                        />
                    </div>
                    <div className="field-line">
                        <TextField
                            floatingLabelText="Password"
                            type="password"
                            name="password"
                            errorText={errors.password}
                            onChange={onChange}
                            value={user.pasword}
                        />
                    </div>

                    <div className="button-line">
                        <RaisedButton type="submit" label="Create New Account" primary />
                    </div>

                    <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
                </form>
            </Card>
        )
    }
}

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default SignUpForm;
