import React, { Component } from 'react';
import Tippy, {useSingleton} from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/animations/scale-subtle.css';

import { ReactComponent as Osu } from '../../../icons/standart-icon.svg';
import { ReactComponent as Taiko } from '../../../icons/taiko-icon.svg';
import { ReactComponent as Fruits } from '../../../icons/catch-icon.svg';
import { ReactComponent as Mania } from '../../../icons/mania-icon.svg';

import './MapIcon.scss';

export default function MapIcon(props) {
    function getDifficultyColor(stars) {
        if(stars < 2) return "diff-easy";
        else if(stars < 2.7) return "diff-normal";
        else if(stars < 4) return "diff-hard";
        else if(stars < 5.3) return "diff-insane";
        else if(stars < 6.5) return "diff-expert";
        else return "diff-expertplus";
    }

    function getDifficultyTooltip(diff) {
        return (
            <div className="icons-tooltip">
                <span>{diff.version}</span>
                <span>{diff.stars}★</span>
            </div>
        )
    }

    const [source, target] = useSingleton();

    return (
        <div className="icons">
            <Tippy 
                singleton={source} 
                delay={200}
                moveTransition='transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                placement="bottom"
            />
            {props.maps.map((m, i) => {
                let color = getDifficultyColor(m.stars);
                return (
                    <Tippy
                        singleton={target }
                        content={getDifficultyTooltip(m)}
                    >
                        <Mania title="" className={color} style={{width: '20px', height: '20px'}} />
                    </Tippy>
                )
            })}
        </div>
    )
}