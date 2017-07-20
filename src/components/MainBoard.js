import React from 'react';
import Pad from './../Pad.js';
import {Drawer, FlatButton} from 'material-ui'
import {Grid, Row, Col} from 'react-bootstrap';
import {List, ListItem} from 'material-ui/List';
import FileInput from 'react-file-input';
import keydown from 'react-keydown';

const styles = {
    uploadButton: {
        verticalAlign: 'middle',
    },
    uploadInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};

@keydown
class MainBoard extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            componentPad1: '',
            componentPad2: '',
            componentPad3: '',
            selected_audio_file: '',
            audio_src1: '',
            file_name_src1: '',
            audio_src2: '',
            audio_src3: '',
            kick_audio_files: [],
            snares_audio_files: [],
            hihats_audio_files: [],
            selected_component: false,
            selected_slot: '',
            component_map: this.initComponentMap(),
            audioDrawerOpen: false
        }
    }

    initComponentMap()  {
        var map = new Map();
        map.set(1, {src: '', name: ''});
        map.set(2, {src: '', name: ''});
        map.set(3, {src: '', name: ''});
        return map;
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
        fetch(process.env.REACT_APP_PUBLIC_API + '/api/sounds/808/kicks')
            .then(response => response.json())
            .then(
                items_kicks => {
                    this.setState({kick_audio_files: items_kicks})
                }
            )
        fetch(process.env.REACT_APP_PUBLIC_API + '/api/sounds/808/snares')
            .then(response => response.json())
            .then(
                items_snares => {
                    this.setState({snares_audio_files: items_snares})
                }
            )
        fetch(process.env.REACT_APP_PUBLIC_API + '/api/sounds/808/hihats')
            .then(response => response.json())
            .then(
                items_hihats=> {
                    this.setState({hihats_audio_files: items_hihats})
                }
            )
    }

    handlerAudioSelection(url, name) {
        if (this.state.selected_slot !== '') {
            var component_map = this.state.component_map;
            component_map.set(this.state.selected_slot, {src: url, name: name});
            this.setState(
                {
                    component_selected:false,
                    selected_slot: '',
                    audioDrawerOpen: false,
                    component_map: component_map
                }
            );
        } else {
            alert("Select a pad!");
        }
    }

    updateCustomAudioSrcMenu( e ) {
        const selectedFile = e.target.files[0];
        const slot = this.state.selected_slot;
        if (selectedFile !== undefined) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                var component_map = this.state.component_map;
                component_map.set(slot, {src: e.target.result, name: selectedFile.name});
                this.setState(
                    {
                        component_selected:false,
                        selected_slot: '',
                        audioDrawerOpen: false,
                        component_map: component_map
                    }
                );
            }.bind(this)
            reader.readAsDataURL(selectedFile)
        }
    }

    render () {
        let audio_kick_files = this.state.kick_audio_files
        let audio_snares_files = this.state.snares_audio_files
        let audio_hihats_files = this.state.hihats_audio_files
        return(
            <div className="App-intro">
                <Drawer
                    open={this.state.audioDrawerOpen}
                    onRequestChange={open => this.setState({audioDrawerOpen: open})}
                    docked={false}
                    openSecondary={true}
                >
                    <List>
                        <ListItem
                            primaryText="Kicks"
                            initiallyOpen={false}
                            primaryTogglesNestedList={true}
                            nestedItems={
                                            audio_kick_files.map(
                                                item =>
                                                <ListItem
                                                    key={item.Name}
                                                    primaryText={item.Name}
                                                    value={item.Url}
                                                    onTouchTap={this.handlerAudioSelection.bind(this, item.Url, item.Name)}
                                                />
                                            )}
                        />
                        <ListItem
                            primaryText="Snares"
                            initiallyOpen={false}
                            primaryTogglesNestedList={true}
                            nestedItems={
                                            audio_snares_files.map(
                                                item =>
                                                <ListItem
                                                    key={item.Name}
                                                    primaryText={item.Name}
                                                    value={item.Url}
                                                    onTouchTap={this.handlerAudioSelection.bind(this, item.Url, item.Name)}
                                                />
                                            )}
                        />
                        <ListItem
                            primaryText="Hihats"
                            initiallyOpen={false}
                            primaryTogglesNestedList={true}
                            nestedItems={
                                            audio_hihats_files.map(
                                                item =>
                                                <ListItem
                                                    key={item.Name}
                                                    primaryText={item.Name}
                                                    value={item.Url}
                                                    onTouchTap={this.handlerAudioSelection.bind(this, item.Url, item.Name)}
                                                />
                                            )}
                        />
                        <FileInput
                            name="My Audio file"
                            accept=".wav,.mp3"
                            placeholder="Custom audio"
                            onChange={this.updateCustomAudioSrcMenu.bind(this)}
                        />
                    </List>
                </Drawer>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={4} md={4}>
                            <Pad
                                ref={ component => this.componentPad1 = component}
                                keyTrigger="1"
                                audioSrc={this.state.component_map.get(1).src}
                                audioFileName={this.state.component_map.get(1).name}
                            />
                            <FlatButton
                                label="Choose a sound"
                                labelPosition="before"
                                style={styles.uploadButton}
                                containerElement="label"
                                onTouchTap={
                                                    e => {
                                                        this.setState(
                                                            {
                                                                audioDrawerOpen: true,
                                                                selected_component: true,
                                                                selected_slot: 1,
                                                            }
                                                        );
                                                    }
                                                 }
                            />
                        </Col>
                        <Col xs={4} md={4}>
                            <Pad
                                ref={ component => this.componentPad2 = component}
                                keyTrigger="2"
                                audioSrc={this.state.component_map.get(2).src}
                                audioFileName={this.state.component_map.get(2).name}
                            />
                            <FlatButton
                                label="Choose a sound"
                                labelPosition="before"
                                style={styles.uploadButton}
                                containerElement="label"
                                onTouchTap={
                                                    e => {
                                                        this.setState(
                                                            {
                                                                audioDrawerOpen: true,
                                                                selected_component: true,
                                                                selected_slot: 2,
                                                            }
                                                        );
                                                    }
                                                 }
                            />
                        </Col>
                        <Col xs={4} md={4}>
                            <Pad
                                ref={ component => this.componentPad3 = component}
                                keyTrigger="3"
                                audioSrc={this.state.component_map.get(3).src}
                                audioFileName={this.state.component_map.get(3).name}
                            />
                            <FlatButton
                                label="Choose a sound"
                                labelPosition="before"
                                style={styles.uploadButton}
                                containerElement="label"
                                onTouchTap={
                                                    e => {
                                                        this.setState(
                                                            {
                                                                audioDrawerOpen: true,
                                                                selected_component: true,
                                                                selected_slot: 3,
                                                            }
                                                        );
                                                    }
                                                 }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default MainBoard;