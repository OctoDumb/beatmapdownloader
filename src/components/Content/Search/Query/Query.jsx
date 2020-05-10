import React, { Component } from 'react';
import './Query.scss';

export default class Query extends Component {
    render() {
        return (
            <div className="content-query">
                <input className="content-query__input" type="text" placeholder="Search" />
            </div>
        )
    }
}