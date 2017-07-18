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
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import FileInput from 'react-file-input';

injectTapEventPlugin();

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
class App extends React.Component {
    constructor() {
        super();

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
            component_map: this.initComponentMap()
        }
    }

    initComponentMap()  {
        var map = new Map();
        map.set(1, {src: '', name: ''});
        map.set(2, {src: '', name: ''});
        map.set(3, {src: '', name: ''});
        return map;
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

    handlerAudioSelection(url, name) {
        if (this.state.selected_slot !== '') {
            var component_map = this.state.component_map;
            component_map.set(this.state.selected_slot, {src: url, name: name});
            this.setState(
                {
                    component_selected:false,
                    selected_slot: '',
                    drawerOpen: false,
                    component_map: component_map
                }
            );
        } else {
            alert("Select a pad!");
        }
    }

    updateCustomAudioSrc( slot, e ) {
        const selectedFile = e.target.files[0];
        if (selectedFile !== undefined) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                var component_map = this.state.component_map;
                component_map.set(slot, {src: e.target.result, name: selectedFile.name});
                this.setState(
                    {
                        component_map: component_map
                    }
                );
            }.bind(this)
            reader.readAsDataURL(selectedFile)
        }
    }

    render() {
        let audio_kick_files = this.state.kick_audio_files
        let audio_snares_files = this.state.snares_audio_files
        let audio_hihats_files = this.state.hihats_audio_files
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
                            </List>
                        </Drawer>
                    </div>
                    <div className="App-intro">
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
                                                        drawerOpen: true,
                                                        selected_component: true,
                                                        selected_slot: 1,
                                                    }
                                                );
                                            }
                                         }
                                    />
                                    <FileInput
                                        name="My Audio file"
                                        accept=".wav,.mp3"
                                        placeholder="Custom audio"
                                        onChange={this.updateCustomAudioSrc.bind(this, 1)}
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
                                                        drawerOpen: true,
                                                        selected_component: true,
                                                        selected_slot: 2,
                                                    }
                                                );
                                            }
                                         }
                                    />
                                    <FileInput
                                        name="My Audio file"
                                        accept=".wav,.mp3"
                                        placeholder="Custom audio"
                                        onChange={this.updateCustomAudioSrc.bind(this, 1)}
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
                                                        drawerOpen: true,
                                                        selected_component: true,
                                                        selected_slot: 3,
                                                    }
                                                );
                                            }
                                         }
                                    />
                                    <FileInput
                                        name="My Audio file"
                                        accept=".wav,.mp3"
                                        placeholder="Custom audio"
                                        onChange={this.updateCustomAudioSrc.bind(this, 1)}
                                    />
                                </Col>*
                            </Row>
                        </Grid>
                    </div>
                </div>
            </MuiThemeProvider>
          );
    }
}

export default App;
