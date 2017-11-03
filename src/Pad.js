import React from 'react';
//import Slider from 'rc-slider';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider'
import {soundManager} from 'soundmanager2';

class Pad extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            audio_src: undefined,
            key_trigger: props.keyTrigger,
            volume: 75,
            file_name: undefined,
            audio: undefined
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.audio_src !== nextProps.audioSrc) {
            var audio = soundManager.createSound({
                volume: this.state.volume,
                file_name: nextProps.audioFileName,
                url: nextProps.audioSrc
            });
            this.setState({audio_src: nextProps.audioSrc, file_name: nextProps.audioFileName, audio: audio})
        }
    }

    componentWillMount() {
        soundManager.setup({debugMode: false})
    }

    play () {
        if (this.state.audio !== undefined) {
            console.log(this.state.audio.playState);
            if (this.state.audio.playState === 0 ) {
                this.state.audio.play()
            } else {
                this.state.audio.setPosition(0);
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

    updateVolume( event, props ) {
        if (this.state.audio !== undefined) {
            var new_audio = this.state.audio;
            new_audio.setVolume(props)
            this.setState({audio: new_audio});
        }
    }

    updateAudioSelect(object, value) {
        this.setState(
            {
                file_name: object.target.innerText,
                audio_src: value
            }
        );
    }

    render() {
        return (
            <div className="PadItem" onClick={this.props.onClick}>
                <div>
                    <AudioNameDisplay
                        fileName={this.state.file_name}
                    />
                </div>
                <div>
                    <RaisedButton
                        style={{width: '7em', height: '7em'}}
                        label={this.state.key_trigger}
                        onTouchTap={this.play.bind(this)}
                    />
                </div>
                <div>
                    <Slider
                        style={{width: '7em', margin: '0 auto'}}
                        min={0}
                        max={100}
                        defaultValue={75}
                        onChange={this.updateVolume.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

const AudioNameDisplay = (props) => {
    if (props.fileName !== undefined) {
        return <span>{props.fileName}</span>
    } else {
        return <span>No audio selected</span>
    }
}

export default Pad;