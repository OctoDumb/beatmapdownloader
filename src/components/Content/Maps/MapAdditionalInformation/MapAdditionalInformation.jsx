import React, { Component } from 'react';
import './MapAdditionalInformation.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapIcon from '../MapIcon';

export default class MapAdditionalInformation extends Component {
    state = {
        beatmapId: this.props.mapset.beatmaps[0].id
    }

    getBeatmapId(beatmapId) {
        this.setState({ beatmapId });
    }

    render() {
        let { mapset } = this.props;
        let beatmap = mapset.beatmaps.filter(b => b.id === this.state.beatmapId)[0];

        return (
            <div className="additional-information" id="additionalInformation">
                <FontAwesomeIcon 
                    className="additional-information__closeBtn" 
                    icon="times"
                    onClick={() => this.props.closeAdditionalInformation()}
                />
                <div className="additional-information-content">
                    <div 
                        className="additional-information-content__header"
                        style={{
                            background: `url("${mapset.covers.cover2x}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                        }}
                    >
                        <div className="additional-information-content__header--main">
                            <div className="additional-information-content__diffs">
                                <MapIcon 
                                    maps={mapset.beatmaps || []}
                                    getBeatmapId={this.getBeatmapId.bind(this)}
                                />
                            </div>
                            <span className="additional-information-content__diffName">{beatmap.version}</span>
                            <div className="additional-information-content__worldStats">
                                <FontAwesomeIcon icon="play-circle"/>
                                <span>{mapset.playcount}</span> 
                            </div>
                            <div className="additional-information-content__worldStats">
                                <FontAwesomeIcon icon="heart"/>
                                <span>{mapset.favourites}</span> 
                            </div>
                            <span className="additional-information-content__tittle">{mapset.title}</span>
                            <span className="additional-information-content__artist">{mapset.artist}</span>
                            <div className="additional-information-content-mapping">
                                <img 
                                    className="additional-information-content-mapping__avatar"
                                    src={`http://s.ppy.sh/a/${mapset.creator.id}` || "https://osu.ppy.sh/images/layout/avatar-guest.png"}
                                    alt=""
                                ></img>
                                <div className="additional-information-content-mapping__information">
                                    <span className="additional-information-content-mapping__text">{`mapped by ${mapset.creator.nickname}`}</span>
                                    <span className="additional-information-content-mapping__text">{`submitted`}</span>
                                    <span className="additional-information-content-mapping__text">{`ranked`}</span>
                                </div>
                            </div>
                        </div>
                        <div className="additional-information-content__header--stats">
                            <div className="additional-information-content__status">{mapset.status}</div>
                            <div className="additional-information-stats">
                                <div className="additional-information-stats__container">
                                    <div className="additional-information-stats__row additional-information-stats__previewBtn">
                                        {this.props.getPreviewBtn()}
                                    </div>
                                </div>
                                <div className="additional-information-stats__container">
                                    <div className="additional-information-stats__row">
                                        <div className="beatmap-basic-stats">
                                            <div className="beatmap-basic-stats__item">
                                                <img 
                                                    className="beatmap-basic-stats__icon"
                                                    src="https://osu.ppy.sh/images/layout/beatmapset-page/total_length.svg"
                                                    alt=""
                                                />
                                                <span>{`${Math.floor(beatmap.length / 60)}:${(beatmap.length - 60 * Math.floor(beatmap.length / 60)).toString().padStart(2, "0")}`}</span>
                                            </div>
                                            <div className="beatmap-basic-stats__item">
                                                <img 
                                                    className="beatmap-basic-stats__icon"
                                                    src="https://osu.ppy.sh/images/layout/beatmapset-page/bpm.svg"
                                                    alt=""
                                                />
                                                <span>{beatmap.bpm}</span>
                                            </div>
                                            <div className="beatmap-basic-stats__item">
                                                <img 
                                                    className="beatmap-basic-stats__icon"
                                                    src="https://osu.ppy.sh/images/layout/beatmapset-page/count_circles.svg"
                                                    alt=""
                                                />
                                                <span>{beatmap.countCircles}</span>
                                            </div>
                                            <div className="beatmap-basic-stats__item">
                                                <img 
                                                    className="beatmap-basic-stats__icon"
                                                    src="https://osu.ppy.sh/images/layout/beatmapset-page/count_sliders.svg"
                                                    alt=""
                                                />
                                                <span>{beatmap.countSliders}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="additional-information-stats__container beatmap-stats">
                                    <div className="additional-information-stats__row">
                                        <span className="beatmap-stats__label">Circle Size</span>
                                        <div className="beatmap-stats__bar">
                                            <div 
                                                className="beatmap-stats__bar--inner"
                                                style={{ width: `${(beatmap.stats.cs / 10).toFixed(2) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="beatmap-stats__value">{beatmap.stats.cs}</span>
                                    </div>
                                    <div className="additional-information-stats__row">
                                        <span className="beatmap-stats__label">HP Drain</span>
                                        <div className="beatmap-stats__bar">
                                            <div 
                                                className="beatmap-stats__bar--inner"
                                                style={{ width: `${(beatmap.stats.hp / 10).toFixed(2) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="beatmap-stats__value">{beatmap.stats.hp}</span>
                                    </div>
                                    <div className="additional-information-stats__row">
                                        <span className="beatmap-stats__label">Accuracy</span>
                                        <div className="beatmap-stats__bar">
                                            <div 
                                                className="beatmap-stats__bar--inner"
                                                style={{ width: `${(beatmap.stats.od / 11).toFixed(2) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="beatmap-stats__value">{beatmap.stats.od}</span>
                                    </div>
                                    <div className="additional-information-stats__row">
                                        <span className="beatmap-stats__label">Approach Rate</span>
                                        <div className="beatmap-stats__bar">
                                            <div 
                                                className="beatmap-stats__bar--inner"
                                                style={{ width: `${(beatmap.stats.ar / 10).toFixed(2) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="beatmap-stats__value">{beatmap.stats.ar}</span>
                                    </div>
                                    <div className="additional-information-stats__row">
                                        <span className="beatmap-stats__label">Star Difficulty</span>
                                        <div className="beatmap-stats__bar">
                                            <div 
                                                className="beatmap-stats__bar--inner"
                                                style={{ width: `${(beatmap.stars / 10).toFixed(2) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="beatmap-stats__value">{beatmap.stars}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
}