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
            audio_files: [],
            selected_audio_file: ''
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

    componentWillMount() {
        fetch('http://localhost:9000/App/audiofileslist')
            .then( response => response.json())
            .then( ({files: items}) => {
                this.setState({audio_files: items})
            });
    }

    audioFileSelected( e ) {
        const audio_file = e.target.getAttribute('name')
        this.setState({selected_audio_file: audio_file})
    }

    assignAudioByClick( e ) {
        console.log("Asignar selected audio a este pad " + this.state.selected_audio_file)
    }
    render() {
        let audio_files = this.state.audio_files
        let select_audio_file = this.state.selected_audio_file
        console.log(select_audio_file)
        return (
            <div className="App">
                <div className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Welcome to React</h2>
                </div>
                <div className="App-intro">
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={3} md={3}>
                                <ul>
                                    {audio_files.map(
                                        item =>
                                            <li
                                                id={item}
                                                key={item}
                                                name={item}
                                                onClick={this.audioFileSelected.bind(this)}
                                            >{item}</li>)}
                                </ul>
                            </Col>
                            <Col xs={3} md={3}>
                                <Pad
                                    ref={ component => this.componentPad1 = component}
                                    keyTrigger="1"
                                />
                            </Col>
                            <Col xs={3} md={3}>
                                <Pad
                                    ref={ component => this.componentPad2 = component}
                                    keyTrigger="2"
                                />
                            </Col>
                            <Col xs={3} md={3}>
                                <Pad
                                    ref={ component => this.componentPad3 = component}
                                    keyTrigger="3"
                                    onClick={this.assignAudioByClick(select_audio_file)}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
          );
    }
}

//const AudioFile = (props) => <li>{props.file}</li>

export default App;
