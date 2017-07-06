import React, { Component } from 'react';
import Slider from 'rc-slider';

class Pad extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            audio_src: '',
            audio_component: '',
            key_trigger: props.keyTrigger,
            volume: 100,
            file_name: 'None audio selected',
            audio_files: [],
        }
    }

    componentWillMount() {
        fetch('http://localhost:9000/App/audiofileslist')
            .then( response => response.json())
            .then( ({files: items}) => {
                this.setState({audio_files: items})
            });
    }

    play () {
        console.log("PAD.js Playing :(" + this.state.audio_src + ")");
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
        if (selectedFile !== undefined) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                this.setState(
                    {
                        file_name: selectedFile.name,
                        audio_src: e.target.result
                    }
                );
            }.bind(this)
            reader.readAsDataURL(selectedFile)
        }
    }

    updateVolume( props ) {
        this.audio_component.volume = props / 100
    }

    componentWillReceiveProps () {

    }
    
    render() {
        let audio_files = this.state.audio_files
        return (
            <div className="PadItem" onClick={this.props.onClick}>
                <div>
                    <span>{this.state.file_name}</span>
                </div>
                <div>
                    <audio
                        ref={component => this.audio_component = component}
                        src={this.state.audio_src}
                    />
                    <button className="butt" onClick={this.play.bind(this)}> {this.state.key_trigger}</button>
                </div>

                <Slider min={0} max={100} defaultValue={75} onChange={this.updateVolume.bind(this)}/>

                <ul>
                    {audio_files.map(
                        item =>
                            <li
                                id={item}
                                key={item}
                                name={item}
                            >{item}</li>)}
                </ul>
                <input className="inputfile" type="file" name="input" onChange={this.updateAudioSrc.bind(this)}/>
            </div>
        )
    }
}

Pad.defaultProps = {
}

export default Pad;