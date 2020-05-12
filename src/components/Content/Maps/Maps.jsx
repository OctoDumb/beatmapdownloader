import React, { Component } from 'react';
import Map from './Map.jsx'
import './Maps.scss';

export default class Search extends Component {
    render() {
        return (
            <div className="content-maps">
                {this.props.mapsets.map(m => {
                    return <Map mapset={m} key={"mapset-" + m.id} />
                })}
            </div>
        )
    }
}