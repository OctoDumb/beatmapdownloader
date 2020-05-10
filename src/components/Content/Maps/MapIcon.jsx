import React, { Component } from 'react';
import { ReactComponent as Osu } from './_Icons/standart-icon.svg';
import { ReactComponent as Taiko } from './_Icons/taiko-icon.svg';
import { ReactComponent as Fruits } from './_Icons/catch-icon.svg';
import { ReactComponent as Mania } from './_Icons/mania-icon.svg';

import './MapIcon.scss';

export default class MapIcon extends Component {
    componentDidMount () {
        this.setState({
            colors: this.props.maps.map(m => this.getDifficultyColor(m.stars))
        })
    }

    getDifficultyColor(stars) {
        if(stars < 2) return "diff-easy";
        else if(stars < 2.7) return "diff-normal";
        else if(stars < 4) return "diff-hard";
        else if(stars < 5.3) return "diff-insane";
        else if(stars < 6.5) return "diff-expert";
        else return "diff-expertplus";
    }

    render() {
        return (
            <div className="icons">
                {this.props.maps.map(m => {
                    let color = this.getDifficultyColor(m.stars);
                    return (
                        <Osu className={color} style={{width: '20px', height: '20px'}} />
                    )
                })}
            </div>
        )
    }
}