import React, { Component } from 'react';
import MapIcon from './MapIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Map extends Component {
    render() {
        return (
            <div className="map">
                <div className="map-header"
                    style={{
                        background: `url("${this.props.background}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                    }}
                >
                    <span className="map-header__status">{this.props.status}</span>
                    <div className="map-header-information">
                        <span className="map-header-information__title">{this.props.title}</span>
                        <span className="map-header-information__artist">{this.props.artist}</span>
                    </div>
                </div>
                <div className="map-content">
                    <div className="map-content-information">
                        <span className="map-content-information__text">mapped by <span className="map-content-information__mapper">{this.props.mapper}</span></span>
                        <span className="map-content-information__text">{this.props.source}</span>
                        <FontAwesomeIcon className="map-content-information__download" icon="download" />
                        <MapIcon maps={this.props.maps || []} />
                    </div>
                </div>
            </div>
        )
    }
}