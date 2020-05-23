import React, { Component } from 'react';
import './MapAdditionalInformation.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapIcon from '../MapIcon';

export default class MapAdditionalInformation extends Component {
    state = {
        mapperAvatar: undefined
    }

    async componentDidMount() {
        this.setState({
            mapperAvatar: await this.getUserAvatar(this.props.mapset.creator.id)
        })
    }

    async getUserAvatar(uId) {
        let { avatar_url } = await window.APIClient.request(`users/${uId}`);
        return avatar_url
    }

    render() {
        let { mapset } = this.props;

        return (
            <div className="additional-information">
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
                                <MapIcon maps={mapset.beatmaps || []} />
                            </div>
                            <span className="additional-information-content__diffName">Hard</span>
                            <div className="additional-information-content__worldStats" >
                                <FontAwesomeIcon icon="play-circle"/>
                                <span>{mapset.playcount}</span> 
                            </div>
                            <div className="additional-information-content__worldStats" >
                                <FontAwesomeIcon icon="heart"/>
                                <span>{mapset.favourites}</span> 
                            </div>
                            <span className="additional-information-content__tittle">{mapset.title}</span>
                            <span className="additional-information-content__artist">{mapset.artist}</span>
                            <div className="additional-information-content-mapping">
                                <img 
                                    className="additional-information-content-mapping__avatar"
                                    src={this.state.mapperAvatar || "https://osu.ppy.sh/images/layout/avatar-guest.png"}
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
                                    <div className="additional-information-stats__row">
                                        <div className="beatmap-basic-stats">
                                            <div className="beatmap-basic-stats__item">
                                                <img 
                                                    className="beatmap-basic-stats__icon"
                                                    src="https://osu.ppy.sh/images/layout/beatmapset-page/total_length.svg"
                                                    alt=""
                                                />
                                                <span>5:21</span>
                                            </div>
                                            <div className="beatmap-basic-stats__item">
                                                <img 
                                                    className="beatmap-basic-stats__icon"
                                                    src="https://osu.ppy.sh/images/layout/beatmapset-page/bpm.svg"
                                                    alt=""
                                                />
                                                <span>180</span>
                                            </div>
                                            <div className="beatmap-basic-stats__item">
                                                <img 
                                                    className="beatmap-basic-stats__icon"
                                                    src="https://osu.ppy.sh/images/layout/beatmapset-page/count_circles.svg"
                                                    alt=""
                                                />
                                                <span>464</span>
                                            </div>
                                            <div className="beatmap-basic-stats__item">
                                                <img 
                                                    className="beatmap-basic-stats__icon"
                                                    src="https://osu.ppy.sh/images/layout/beatmapset-page/count_sliders.svg"
                                                    alt=""
                                                />
                                                <span>502</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="additional-information-stats__container beatmap-stats">
                                    <div className="additional-information-stats__row">
                                        <span className="beatmap-stats__label">Circle Size</span>
                                        <div className="beatmap-stats__bar">
                                            <div className="beatmap-stats__bar--inner"></div>
                                        </div>
                                        <span className="beatmap-stats__value">4</span>
                                    </div>
                                    <div className="additional-information-stats__row">
                                        <span className="beatmap-stats__label">HP Drain</span>
                                        <div className="beatmap-stats__bar">
                                            <div className="beatmap-stats__bar--inner"></div>
                                        </div>
                                        <span className="beatmap-stats__value">4</span>
                                    </div>
                                    <div className="additional-information-stats__row">
                                        <span className="beatmap-stats__label">Accuracy</span>
                                        <div className="beatmap-stats__bar">
                                            <div className="beatmap-stats__bar--inner"></div>
                                        </div>
                                        <span className="beatmap-stats__value">8.5</span>
                                    </div>
                                    <div className="additional-information-stats__row">
                                        <span className="beatmap-stats__label">Approach Rate</span>
                                        <div className="beatmap-stats__bar">
                                            <div className="beatmap-stats__bar--inner"></div>
                                        </div>
                                        <span className="beatmap-stats__value">9.3</span>
                                    </div>
                                    <div className="additional-information-stats__row">
                                        <span className="beatmap-stats__label">Star Difficulty</span>
                                        <div className="beatmap-stats__bar">
                                            <div className="beatmap-stats__bar--inner"></div>
                                        </div>
                                        <span className="beatmap-stats__value">5.83</span>
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