import React from 'react';
import logo from './logo.svg';
import keydown from 'react-keydown';
import  {Grid, Row, Col} from 'react-bootstrap';
import Pad from './Pad.js';
import './App.css';
import 'rc-slider/assets/index.css';

@keydown
class App extends React.Component {
    constructor() {
        super();

        this.state = {
            componentPad1: '',
            componentPad2: '',
            componentPad3: '',
            audio_files: [],
            selected_audio_file: '',
            audio_src1: '',
            audio_src2: '',
            audio_src3: ''
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

    

    handleAudioSelection ( e ) {
        const audio_file = e.target.getAttribute('name')
        this.setState({selected_audio_file: audio_file})
        this.selected_audio_file = audio_file;
    }

    updateChildComponentAudioFile(audio_src_index) {
        console.log("Actualizar la url del hijo " + this.state.selected_audio_file)
        console.log(audio_src_index)
        this.setState(
            {
                audio_src1: this.selected_audio_file
            }
        )
    }

    render() {
        let audio_files       = this.state.audio_files
        let select_audio_file = this.state.selected_audio_file
        let select            = this.selected_audio_file

        console.log("App.js RENDER: La url asiganada a pad(1) es " + this.state.audio_src1)
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
          );
    }
}

export default App;
