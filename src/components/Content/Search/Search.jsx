import React, { Component } from 'react';
import './Search.scss';

export default class Search extends Component {
    render() {
        return (
            <div className="content-search">
                <input className="content-search__input" type="text" placeholder="Search" />
            </div>
        )
    }
}