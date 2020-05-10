import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class WindowControlButtons extends Component {
    constructor () {
        super();

        this.win = window.electron.remote.getCurrentWindow();
    }
    render() {
        return (
            <div className="window-control__buttons">
                <div className="window-control__btn" onClick={() => {this.win.minimize()}}>
                    <FontAwesomeIcon icon="window-minimize" />
                </div>
                <div className="window-control__btn" onClick={() => {!this.win.isMaximized() ? this.win.maximize() : this.win.unmaximize()}}>
                    <FontAwesomeIcon icon="window-maximize" />
                </div>
                <div className="window-control__btn" onClick={() => {this.win.close()}}>
                    <FontAwesomeIcon icon="times" />
                </div>
            </div>
        )
    }
}   