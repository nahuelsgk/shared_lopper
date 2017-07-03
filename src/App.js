import 'rc-slider/assets/index.css';
import React, { Component } from 'react';
import  {Grid, Row, Col} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import keydown from 'react-keydown';
import Slider from 'rc-slider';

@keydown
class App extends Component {
    constructor() {
        super();
        this.state = {
            componentPad1: ''
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
                                <Pad ref={ component => this.componentPad1 = component} keyTrigger="1" />
                            </Col>
                            <Col xs={4} md={4}>
                                <Pad ref={ component => this.componentPad2 = component} keyTrigger="2" />
                            </Col>
                            <Col xs={4} md={4}>
                                <Pad ref={ component => this.componentPad3 = component} keyTrigger="3" />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
          );
    }
}


class Pad extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            audio_src: '',
            audio_component: '',
            key_trigger: props.keyTrigger,
            volume: 100
        }
    }

    play () {
        if (this.state.audio_src) {
            if (this.audio_component.paused) {
                var playPromise = this.audio_component.play()
                if (playPromise !== undefined) {
                    playPromise.then(function () {
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            } else {
                this.audio_component.currentTime = 0;
            }
        }
    }

    updateAudioSrc( e ) {
        const selectedFile = e.target.files[0];
        //console.log('Selected File', selectedFile);

        var reader = new FileReader();
        reader.onloadend = function (e) {
            this.setState({audio_src: e.target.result});
        }.bind(this)
        reader.readAsDataURL(selectedFile)
    }

    updateVolume( props ) {
        this.audio_component.volume = props / 100
    }

    render() {
        return (
            <div>
                <audio
                    ref={component => this.audio_component = component}
                    src={this.state.audio_src}
                />
                <button className="butt" onClick={this.play.bind(this)}> {this.state.key_trigger}</button>
                <Slider min={0} max={100} defaultValue={75} onChange={this.updateVolume.bind(this)}/>
                <input className="inputfile" type="file" name="input" onChange={this.updateAudioSrc.bind(this)}/>
            </div>
        )
    }
}

export default App;
