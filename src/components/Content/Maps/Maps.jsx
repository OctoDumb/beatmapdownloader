import React, { Component } from 'react';
import Map from './Map.jsx'
import './Maps.scss';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.scroll = this.scroll.bind(this);
    }

    scroll(e) {
        let { scrollTop, scrollHeight, clientHeight } = e.nativeEvent.target
        const header = document.getElementById('header');

        scrollTop >= 600 ? header.classList.add('header-scroll') : header.classList.remove('header-scroll');

        if (scrollHeight - scrollTop - clientHeight < 200) this.props.nextPage();
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