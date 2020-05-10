import React, { Component } from 'react';
import './Content.scss';
import Search from './Search/Search';
import Sort from './Sort/Sort';
import Maps from './Maps/Maps';

export default class Content extends Component {
    render() {
        return (
            <div className="content">
                <Search />
                <Sort />
                <Maps />
            </div>
        )
    }
}