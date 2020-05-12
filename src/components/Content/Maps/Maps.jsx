import React, { Component } from 'react';
import Map from './Map.jsx'
import './Maps.scss';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.scroll = this.scroll.bind(this);
    }

    scroll(e) {
        let yPos = e.nativeEvent.target.scrollTop;
        const header = document.getElementById('header');

        yPos >= 600 ? header.classList.add('header-scroll') : header.classList.remove('header-scroll')
    }

    render() {
        return (
            <div className="content-maps" onScroll={this.scroll}>
                {this.props.mapsets.map(m => {
                    return <Map mapset={m} key={"mapset-" + m.id} />
                })}
            </div>
        )
    }
}