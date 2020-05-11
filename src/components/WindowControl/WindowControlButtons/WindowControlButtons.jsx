import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class WindowControlButtons extends Component {
    constructor () {
        super();

        this.win = window.electron.remote.getCurrentWindow();

        this.state = {
            isMaximized: this.win.isMaximized()
        }
    }

    componentDidMount() {
        this.win.on("maximize", () => this.setState({isMaximized: true}));
        this.win.on("unmaximize", () => this.setState({isMaximized: false}));
    }

    windowMaximize() {
        if (!this.state.isMaximized)
            this.win.maximize();
        else 
            this.win.unmaximize();
    }

    render() {
        return (
            <div className="window-control__buttons">
                <div className="window-control__btn" onClick={() => {this.win.minimize()}}>
                    <FontAwesomeIcon icon="window-minimize" />
                </div>
                <div className="window-control__btn" onClick={() => {this.windowMaximize()}}>
                    {!this.state.isMaximized ? <FontAwesomeIcon icon="window-maximize" /> : <FontAwesomeIcon icon="window-restore" />}
                </div>
                <div className="window-control__btn" onClick={() => {this.win.close()}}>
                    <FontAwesomeIcon icon="times" />
                </div>
            </div>
        )
    }
}   