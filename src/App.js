import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import SignUpPage from './containers/SignUpPage'
import LoginPage from './containers/LoginPage'
import 'rc-slider/assets/index.css';
import React from 'react';
import './App.css';
import {browserHistory} from 'react-router';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import MainBoard from './components/MainBoard'
import Auth from './modules/Auth'
injectTapEventPlugin();

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <div className="App">
                        <div>
                            <AppBar
                                title="Sound looper"
                                style={{margin:20}}
                                onLeftIconButtonTouchTap={ e => this.setState({drawerOpen: !this.state.drawerOpen})}
                            />
                            <Drawer
                                open={this.state.drawerOpen}
                                onRequestChange={open => this.setState({drawerOpen: open})}
                                docked={false}
                            >
                                {Auth.isAuthenticatedUser ? (
                                    <Link to={'/dashboard'}>
                                        <MenuItem
                                            onTouchTap={e => this.setState({drawerOpen: false})}
                                            value={'/'}
                                            primaryText="Home"
                                        />
                                    </Link>) : (
                                        <div>
                                            <Link to={'/signup'}>
                                                <MenuItem
                                                    onTouchTap={e => this.setState({drawerOpen: false})}
                                                    primaryText="Signup"
                                                />
                                            </Link>
                                            <Link to={'/login'}>
                                            <MenuItem
                                            onTouchTap={e => this.setState({drawerOpen: false})}
                                            primaryText="Login"
                                            />
                                            </Link>
                                        </div>
                                )}
                            </Drawer>
                        </div>
                        <Route path="/dashboard" component={MainBoard} />
                        <Route path="/signup" component={SignUpPage} />
                        <Route path="/login" component={LoginPage} />
                    </div>
                </Router>
            </MuiThemeProvider>
          );
    }
}

export default App;
