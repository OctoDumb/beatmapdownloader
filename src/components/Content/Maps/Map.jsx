import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import MapIcon from './MapIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { changePreviewPlayStatus } from '../../../redux/actions/previewAction';
import MapAdditionalInformation from './MapAdditionalInformation/MapAdditionalInformation';


const Map = (props) => {
    const [progress, setProgress] = useState(0);
    const [additionalInformationShowed, setAdditionalInformationShowed] = useState(false);
    const { mapset } = props;
    const showAdditionalInformation =() => {
        setTimeout(() => {
            document.getElementById('contentMaps').style.filter = "blur(4px)"
            document.getElementById('header').style.filter = "blur(4px)"
        }, 700);
        props.setShowInfo(true);
        setAdditionalInformationShowed(true)
    }

    const close = (e) => {
        if (!e || e.currentTarget === e.target) {
            props.setShowInfo(false);

            let additionalInformation = document.getElementById('additionalInformation');
            additionalInformation.classList.add('additional-information--faded');

            document.getElementById('contentMaps').style.filter = "blur(0px)"
            document.getElementById('header').style.filter = "blur(0px)"

            setTimeout(() => {
                additionalInformation.classList.remove('additional-information--faded');
                setAdditionalInformationShowed(false)
            }, 700);
        }
    }

    const playPreview = () => {
        props.audioApi.src = props.mapset.preview;
        props.audioApi.play();
    }

    const pausePreview = () => {
        props.audioApi.pause();
    }

    const getIconBubble = () => {
        let { video, storyboard } = props.mapset.extra;
        if (!video && !storyboard) return null;
        if (video)
            return (
                <div className="map-header__icon">
                    <FontAwesomeIcon icon="film" />
                </div>
            )
        else if (storyboard)
            return (
                <div className="map-header__icon">
                    <FontAwesomeIcon icon="image" />
                </div>
            )
    }

    const getPreviewBtn = () => {
        let { mapset, playStatus, previewId } = props;

        if (playStatus && previewId === mapset.id) {
            return (
                <FontAwesomeIcon
                    className="map-header__playBtn"
                    icon="pause"
                    onClick={() => {
                        pausePreview();
                        props.changePreviewPlayStatus(false, mapset.id);
                    }}
                />
            )
        }

        return (
            <FontAwesomeIcon
                className="map-header__playBtn"
                icon="play"
                onClick={() => {
                    playPreview();
                    props.changePreviewPlayStatus(true, mapset.id);
                }}
            />
        )
    }

    const download = (mapset) => {
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

    return (
        <div className="map">
            {additionalInformationShowed && createPortal(
                <MapAdditionalInformation
                    mapset={mapset}
                    close={close}
                    getPreviewBtn={getPreviewBtn}
                />,
                document.getElementById('content')
            )}
            <div className="progress" style={{ width: `${progress}%` }}>
                {progress === 100 && <FontAwesomeIcon className="progress__icon" icon="check" />}
            </div>
            {getPreviewBtn()}
            <div className="map-header"
                onClick={() => showAdditionalInformation()}
                style={{
                    background: `url("${mapset.covers.cover2x}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
            >
                <div className="map-header__bubbles">
                    {getIconBubble()}
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
                        onClick={() => download(mapset)}
                    />
                </div>
                <MapIcon mini maps={mapset.beatmaps || []} />
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        playStatus: state.preview.playStatus,
        previewId: state.preview.previewId,
    }
}

const dispatchStateToProps = dispatch => {
    return {
        changePreviewPlayStatus: (playStatus, beatmapsetId) => dispatch(changePreviewPlayStatus(playStatus, beatmapsetId)),
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Map)
