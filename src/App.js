import 'rc-slider/assets/index.css';
import React, { Component } from 'react';
import  {Grid, Row, Col} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import keydown from 'react-keydown';
import Pad from './Pad.js';

@keydown
class App extends Component {
    constructor() {
        super();
        this.state = {
            componentPad1: '',
            componentPad2: '',
            componentPad3: '',
        }
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
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Welcome to React</h2>
                </div>
                <div className="App-intro">
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={4} md={4}>
                                <Pad
                                    ref={ component => this.componentPad1 = component}
                                    keyTrigger="1"
                                />
                            </Col>
                            <Col xs={4} md={4}>
                                <Pad
                                    ref={ component => this.componentPad2 = component}
                                    keyTrigger="2"
                                />
                            </Col>
                            <Col xs={4} md={4}>
                                <Pad
                                    ref={ component => this.componentPad3 = component}
                                    keyTrigger="3"
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
          );
    }
}



export default App;
