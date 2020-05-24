import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import MapIcon from './MapIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { changePreviewPlayStatus } from '../../../redux/actions/previewAction';
import MapAdditionalInformation from './MapAdditionalInformation/MapAdditionalInformation';


class Map extends Component {
    state = {
        progress: 0,
        additionalInformationShowed: false
    };

    showAdditionalInformation(e) {
        this.setState({ additionalInformationShowed: true })
    }

    closeAdditionalInformation() {
        this.setState({ additionalInformationShowed: false })
    }

    playPreview() {
        this.props.audioApi.src = this.props.mapset.preview;
        this.props.audioApi.play();
    }

    pausePreview() {
        this.props.audioApi.pause();
    }

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

    getPreviewBtn() {
        let { mapset, playStatus, previewId } = this.props;

        if (playStatus && previewId === mapset.id ) {
            return (
                <FontAwesomeIcon 
                    className="map-header__playBtn" 
                    icon="pause"
                    onClick={() => {
                        this.pausePreview();
                        this.props.changePreviewPlayStatus(false, mapset.id);
                    }}
                />
            )
        }

        return (
            <FontAwesomeIcon 
                className="map-header__playBtn" 
                icon="play"
                onClick={() => {
                    this.playPreview();
                    this.props.changePreviewPlayStatus(true, mapset.id);
                }}
            />
        ) 
    }

    download() {
        let { mapset } = this.props;

        try {
            window.Downloader.add(mapset);
            window.toastr.success(`${mapset.artist} - ${mapset.title}`, "Download", {
                progressBar: true,
                progressAnimation: 'decreasing'
            });
        } catch (e) {
            window.toastr.error(`${mapset.artist} - ${mapset.title} \n`, e, {
                progressBar: true,
                progressAnimation: 'decreasing'
            });
        }
    }

    componentDidMount() {
        let { id } = this.props.mapset;
        window.Downloader.on('progress', data => {
            if(data.id === id)
                this.setState({ progress: data.progress });
        });

        window.Downloader.on('done', data => {
            if(data.id === id)
                setTimeout(() => this.setState({ progress: 0 }), 5e3);
        });

        this.props.audioApi.addEventListener('ended', () => {
            this.props.changePreviewPlayStatus(false);
        })
    }
    
    render() {
        let { mapset } = this.props;

        return (
            <div className="map">
                {this.state.additionalInformationShowed && createPortal(
                    <MapAdditionalInformation 
                        mapset={mapset} 
                        closeAdditionalInformation={this.closeAdditionalInformation.bind(this)}
                        getPreviewBtn={this.getPreviewBtn.bind(this)}
                    />, 
                    document.getElementById('content')
                )}
                <div className="progress" style={{ width: `${this.state.progress}%` }}>
                    {this.state.progress === 100 && <FontAwesomeIcon className="progress__icon" icon="check" />} 
                </div>
                {this.getPreviewBtn()}
                <div className="map-header"
                    onClick={() => this.showAdditionalInformation()}
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
                    <MapIcon mini maps={mapset.beatmaps || []} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        playStatus: state.preview.playStatus,
        previewId: state.preview.previewId,
    }
}

const dispatchStateToProps = dispatch => {
    return {
        changePreviewPlayStatus: (playStatus ,beatmapsetId) => dispatch(changePreviewPlayStatus(playStatus, beatmapsetId)),
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Map)