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

    windowMaximize() {
        if (!this.state.isMaximized) {
            this.win.maximize()
            this.setState({isMaximized: true})
        } else {
            this.win.unmaximize()
            this.setState({isMaximized: false})
        } 
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