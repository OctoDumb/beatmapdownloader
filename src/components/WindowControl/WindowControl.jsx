import React, { Component } from 'react';
import './WindowControl.scss';
import WindowControlButtons from './WindowControlButtons/WindowControlButtons';

export default class WindowControl extends Component {
    render() {
        return (
            <div className="window-control">
                <div className="draggable"></div>
                <WindowControlButtons />
            </div>
        )
    }
}