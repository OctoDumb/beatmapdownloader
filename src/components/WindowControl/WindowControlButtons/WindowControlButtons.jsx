import React, { Component } from 'react';
import WindowControlBtn from './WindowControlBtn';

export default class WindowControlButtons extends Component {
    render() {
        return (
            <div className="window-control__buttons">
                {['window-minimize', 'window-maximize','times'].map(i => {
                    return <WindowControlBtn icon={i} />
                })}
            </div>
        )
    }
}