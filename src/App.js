import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Grid, Row, Col} from 'react-bootstrap';
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import keydown from 'react-keydown';
import 'rc-slider/assets/index.css';
import Pad from './Pad.js';
import React from 'react';
import './App.css';

injectTapEventPlugin();

@keydown
class App extends React.Component {
    constructor() {
        super();

        var componentMap = this.initMapComponent();

        this.state = {
            componentPad1: '',
            componentPad2: '',
            componentPad3: '',
            componentPad4: '',
            audio_files: [],
            selected_audio_file: '',
            audio_src1: '',
            audio_src2: '',
            audio_src3: '',
            audio_src4: '',
            componentsMap: componentMap
        }


    }

    initMapComponent() {
        var mapComponent = new Map();
        mapComponent.set("4", {keyTrigger: 4});
        return mapComponent;
    }

    componentWillReceiveProps( nextProps ) {
        const keydown = nextProps.keydown
        if ( keydown.event ) {
            // inspect the keydown event and decide what to do
            if (keydown.event.key === '1') {
                this.componentPad1.play();
            }
            if (keydown.event.key === '2') {
                this.componentPad2.play();
            }
            if (keydown.event.key === '3') {
                this.componentPad3.play();
            }
            if (keydown.event.key === '4') {
                this.componentPad4.play();
            }
        }
    }

    render() {
        return (
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
                            <MenuItem
                                onTouchTap={e => this.setState({drawerOpen: false})}
                                value={'/'} primaryText="Home"
                            />
                        </Drawer>
                    </div>
                    <div className="App-intro">
                        <Grid>
                            <Row className="show-grid">
                                <Col xs={4} md={4}>
                                    <Pad
                                        ref={ component => this.componentPad1 = component}
                                        keyTrigger="1"
                                        audio_src={this.state.audio_src1}
                                    />
                                </Col>
                                <Col xs={4} md={4}>
                                    <Pad
                                        ref={ component => this.componentPad2 = component}
                                        keyTrigger="2"
                                        audio_src={this.audio_src2}
                                    />
                                </Col>
                                <Col xs={4} md={4}>
                                    <Pad
                                        ref={ component => this.componentPad3 = component}
                                        keyTrigger="3"
                                        audio_src={this.audio_src3}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </MuiThemeProvider>
          );
    }
}

export default App;
