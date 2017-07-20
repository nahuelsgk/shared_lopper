import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import SignUpForm from './components/SignUpForm'
import 'rc-slider/assets/index.css';
import React from 'react';
import './App.css';

import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import MainBoard from './components/MainBoard'
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
            <Router>
                <MuiThemeProvider>
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
                                <Link to={'/home'}>
                                    <MenuItem
                                        onTouchTap={e => this.setState({drawerOpen: false})}
                                        value={'/'}
                                        primaryText="Home"
                                    />
                                </Link>
                                <Link to={'/signup'}>
                                    <MenuItem
                                        onTouchTap={e => this.setState({drawerOpen: false})}
                                        primaryText="Login"
                                    />
                                </Link>
                            </Drawer>
                        </div>
                        <Route path="/home" component={MainBoard} />
                        <Route path="/signup" component={SignUpFormInit} />
                    </div>
                </MuiThemeProvider>
            </Router>
          );
    }
}

const SignUpFormInit = () => {
    return <SignUpForm
        onSubmit={(e) => console.log('submitted')}
        onChange={(e) => console.log('changed')}
        errors={{ email: 'Invalid' }}
        user={{ email: 'jane@doe.com', name: 'Jane Doe' }}
    />
}

export default App;
