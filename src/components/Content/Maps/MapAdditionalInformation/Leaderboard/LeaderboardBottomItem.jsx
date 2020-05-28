import React, { Component } from 'react';
import LeaderboardMods from './LeaderboardMods';

const f = n => n.toLocaleString("en");

export default class LeaderboardBottomItem extends Component {
    render () {
        let { score, isMe, isFriend } = this.props;

        return (
            <tr className={(isMe ? "leaderboard-table__body--me" : null) || (isFriend ? "leaderboard-table__body--friend" : null)} >
                <td className="leaderboard-table--rank" >#{this.props.rank}</td>
                <td className="leaderboard-table--grade" >
                    <img 
                        className="leaderboard-top-item__gradeIcon" 
                        src={`https://osu.ppy.sh/images/badges/score-ranks-v2019/GradeSmall-${this.props.checkGrade(score.rank)}.svg?3`}
                        alt=""
                    />
                </td>
                <td className="leaderboard-table--score" >{f(score.score)}</td>
                <td className={`leaderboard-table--accuracy ${score.accuracy === 1 ? "leaderboard-table--perfect" : null}`} >{(score.accuracy * 100).toFixed(2)}%</td>
                <td className="leaderboard-table--flag" >
                    <img 
                        className="leaderboard-top-item__flag" 
                        src={`https://osu.ppy.sh/images/flags/${score.user.country_code}.png`}
                        alt=""
                    />
                </td>
                <td className="leaderboard-table--player" >{score.user.username}</td>
                <td className={`leaderboard-table--combo ${score.perfect ? "leaderboard-table--perfect" : null}`} >{f(score.max_combo)}x</td>
                {
                    this.props.counts.map((c, i) => <td key={i} className="leaderboard-table--hitStat">{f(c)}</td>)
                }
                <td className="leaderboard-table--pp" >{f(Math.round(score.pp))}</td>
                <td className="leaderboard-table--mods" >
                    <div className="leaderboard-mods">
                        <LeaderboardMods mods={score.mods} id={score.id} checkModsIcon={this.props.checkModsIcon} />
                    </div>
                </td>
            </tr>
        )
    }
}