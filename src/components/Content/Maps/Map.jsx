import React, { Component } from 'react';
import MapIcon from './MapIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Map extends Component {
    getIconBubble() {
        let { video, storyboard } = this.props.mapset.extra;
        if(!video && !storyboard) return null;
        if(video) 
            return (
                <div className="map-header__icon">
                    <FontAwesomeIcon icon="film" />
                </div>
            )
        else if(storyboard)
            return (
                <div className="map-header__icon">
                    <FontAwesomeIcon icon="image" />
                </div>
            )
    }

    download() {
        let { mapset } = this.props;

        try {
            window.Downloader.add(mapset);
            window.toastr.success(`${mapset.artist} - ${mapset.title} started downloading`);
        } catch (e) {
            window.toastr.error(`${mapset.artist} - ${mapset.title} can not be downloaded`);
        }
    }
    
    render() {
        let { mapset } = this.props;

        return (
            <div className="map">
                <div className="map-header"
                    style={{
                        background: `url("${mapset.covers.cover2x}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                    }}
                >
                    
                    <div className="map-header__bubbles">
                        {this.getIconBubble()}
                        <span className="map-header__status">{mapset.status}</span>
                    </div>
                    <div className="map-header-information">
                        <span className="map-header-information__title">{mapset.title}</span>
                        <span className="map-header-information__artist">{mapset.artist}</span>
                    </div>
                </div>
                <div className="map-content">
                    <div className="map-content-information">
                        <span className="map-content-information__text">mapped by <span className="map-content-information__mapper">{mapset.creator.nickname}</span></span>
                        <span className="map-content-information__text">{mapset.source}</span>
                        <FontAwesomeIcon 
                            className="map-content-information__download" 
                            icon="download" 
                            onClick={() => this.download()}
                        />
                    </div>
                    <MapIcon maps={mapset.beatmaps || []} />
                </div>
            </div>
        )
    }
}