import React, { Component } from 'react';
import './Leaderboard.scss'
import LeaderboardBottomItem from './LeaderboardBottomItem';
import LeaderboardTopItem from './LeaderboardTopItem';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    state = {
        me: 0,
        friends: []
    };

    icons = {
        EZ: 'easy',
        NF: 'no-fail',
        HT: 'half',
        HR: 'hard-rock',
        SD: 'sudden-death',
        PF: 'perfect',
        DT: 'double-time',
        NC: 'nightcore',
        HD: 'hidden',
        FL: 'flashlight',
        RX: 'relax',
        AP: 'autopilot',
        SO: 'spun-out',
        TD: 'touchdevice',
        FI: 'fader',
        MR: 'mirror',
    }

    componentWillMount() {
        this.setState({ 
            me: this.props.userId,
            friends: this.props.friends
        });
    }

    checkGrade(grade) {
        switch (grade) {
            case "X":
                return "SS"
            case "XH":
                return "SS-Silver"
            case "SH":
                return "S-Silver"
            default:
                return grade;
        }
    }

    checkModsIcon(mod) {
        return "https://osu.ppy.sh/images/badges/mods/mod_" + (this.icons[mod] || mod) + ".png"
    }

    getHitNames(mode) {
        switch(mode) {
            case 1:
                return ['great', 'good', 'miss'];
            case 2:
                return ['fruits', 'ticks', 'drp miss', 'miss'];
            case 3:
                return ['max', '300', '200', '100', '50', 'miss'];
            default:
                return ['300', '100', '50', 'miss'];
        }
    }

    getHits(score) {
        let { statistics: hits } = score;
        switch(score.mode_int) {
            case 1:
                return [ hits.count_300, hits.count_100, hits.count_miss ];
            case 2:
                return [ hits.count_300, hits.count_100, hits.count_katu, hits.count_miss ];
            case 3:
                return [ hits.count_geki, hits.count_300, hits.count_katu, hits.count_100, hits.count_50, hits.count_miss ];
            default:
                return [ hits.count_300, hits.count_100, hits.count_50, hits.count_miss ];
        }
    }

    render() {
        if(!this.props.scores || !this.props.scores.length) return null;

        let first = this.props.scores[0];
        let userScore = this.props.userScore;

        return (
            <>
                <div className="leaderboard-top">
                    <LeaderboardTopItem 
                        score={first}
                        position="1"
                        hitNames={this.getHitNames(first.mode_int)}
                        hits={this.getHits(first)}
                        checkGrade={this.checkGrade.bind(this)} 
                        checkModsIcon={this.checkModsIcon.bind(this)} 
                    />
                    {(userScore && userScore.position > 1) ? 
                        <LeaderboardTopItem {...userScore} 
                            hitNames={this.getHitNames(userScore.score.mode_int)} 
                            hits={this.getHits(userScore.score)} 
                            checkGrade={this.checkGrade.bind(this)} 
                            checkModsIcon={this.checkModsIcon.bind(this)}
                        /> : null
                    }
                </div>
                <div className="leaderboard-bottom">
                    <table className="leaderboard-table">
                        <thead className="leaderboard-table__header">
                            <tr>
                                <th className="leaderboard-table--rank">rank</th>
                                <th className="leaderboard-table--grade"></th>
                                <th className="leaderboard-table--score">score</th>
                                <th className="leaderboard-table--accuracy">accuracy</th>
                                <th className="leaderboard-table--flag"></th>
                                <th className="leaderboard-table--player">player</th>
                                <th className="leaderboard-table--combo">max combo</th>
                                {
                                    this.getHitNames(first.mode_int).map((n, i) => <th key={i} className="leaderboard-table--hitStat">{n}</th>)
                                }
                                <th className="leaderboard-table--pp">pp</th>
                                <th className="leaderboard-table--mods">mods</th>
                            </tr>
                        </thead>
                        <tbody className="leaderboard-table__body">
                            {this.props.scores.map(
                                (s, i) => <LeaderboardBottomItem
                                    counts={this.getHits(s)}
                                    key={s.id}
                                    score={s}
                                    rank={i + 1}
                                    isMe={s.user_id === this.state.me}
                                    isFriend={this.state.friends.includes(s.user_id)}
                                    checkGrade={this.checkGrade.bind(this)}
                                    checkModsIcon={this.checkModsIcon.bind(this)}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.userInformation.userId,
        friends: state.userInformation.friends
    }
}

const dispatchStateToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, dispatchStateToProps)(Leaderboard)