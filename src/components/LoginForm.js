import {Link} from 'react-router-dom';
import React, {PropTypes} from 'react';
import {Card, CardText, TextField, RaisedButton} from 'material-ui'

class LoginForm extends React.Component
{
    constructor(props){
        super(props)
    }

    render() {
        let errors = this.props.errors
        let onChange = this.props.onChange
        let user = this.props.user
        let onSubmit = this.props.onSubmit
        return (
            <Card className="container">
                <form action="/" onSubmit={onSubmit}>
                    <h2 className="card-heading">Login</h2>

                    {errors.summary && <p className="error-message">{errors.summary}</p>}

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
                            onChange={onChange}
                            errorText={errors.password}
                            value={user.password}
                        />
                    </div>

                    <div className="button-line">
                        <RaisedButton type="submit" label="Log in" primary />
                    </div>

                    <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
                </form>
            </Card>
        )
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default LoginForm;