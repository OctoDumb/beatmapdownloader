import React, { Component } from 'react';
import LeaderboardMods from './LeaderboardMods';

const f = n => n.toLocaleString("en");

export default class LeaderboardTopItem extends Component {
    fixAvatar(url) {
        if(url.startsWith("/"))
            return 'https://osu.ppy.sh' + url;
        return url;
    }

    render () {
        let { score, position } = this.props;

        return (
            <div className="leaderboard-top-item">
                <div className="leaderboard-top-item__position">
                    <span className="leaderboard-top-item__worldRank">#{f(position)}</span>
                    <img
                        className="leaderboard-top-item__gradeIcon"
                        src={`https://osu.ppy.sh/images/badges/score-ranks-v2019/GradeSmall-${this.props.checkGrade(score.rank)}.svg?3`}
                        alt=""
                    />
                </div>
                <img 
                    className="leaderboard-top-item__playerAvatar"
                    src={this.fixAvatar(score.user.avatar_url)}
                    alt=""
                />
                <div className="leaderboard-top-item__userBox">
                    <span className="leaderboard-top-item__nickname">{score.user.username}</span>
                    <span className="leaderboard-top-item__achieved">achieved {"some time"} ago</span>
                    <img
                        className="leaderboard-top-item__flag"
                        src={`https://osu.ppy.sh/images/flags/${score.user.country_code}.png`}
                        alt=""
                    />
                </div>
                <div className="leaderboard-top-item-stats">
                    <div className="leaderboard-top-item-stats__top">
                        <div className="leaderboard-top-item-stats__topItem">
                            <span className="leaderboard-top-item-stats__topItem--title">Score</span>
                            <span className="leaderboard-top-item-stats__topItem--value">{f(score.score)}</span>
                        </div>
                        <div className="leaderboard-top-item-stats__topItem">
                            <span className="leaderboard-top-item-stats__topItem--title">Accuracy</span>
                            <span className="leaderboard-top-item-stats__topItem--value">{(score.accuracy * 100).toFixed(2)}%</span>
                        </div>
                        <div className="leaderboard-top-item-stats__topItem">
                            <span className="leaderboard-top-item-stats__topItem--title">max combo</span>
                            <span className="leaderboard-top-item-stats__topItem--value">{f(score.max_combo)}x</span>
                        </div>
                    </div>
                    <div className="leaderboard-top-item-stats__bottom">
                        {
                            this.props.hitNames.map(
                                (n, i) => <div key={i} className="leaderboard-top-item-stats__bottomItem">
                                    <span className="leaderboard-top-item-stats__bottomItem--title">{n}</span>
                                    <span className="leaderboard-top-item-stats__bottomItem--value">{f(this.props.hits[i])}</span>
                                </div>
                            )
                        }
                        <div className="leaderboard-top-item-stats__bottomItem">
                            <span className="leaderboard-top-item-stats__bottomItem--title">mods</span>
                            <span className="leaderboard-top-item-stats__bottomItem--value">
                                <LeaderboardMods mods={score.mods} id={score.id} checkModsIcon={this.props.checkModsIcon} t />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
