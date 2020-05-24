import React from 'react';
import Tippy, {useSingleton} from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/animations/scale-subtle.css';

import { ReactComponent as Osu } from '../../../icons/standart-icon.svg';
import { ReactComponent as Taiko } from '../../../icons/taiko-icon.svg';
import { ReactComponent as Fruits } from '../../../icons/catch-icon.svg';
import { ReactComponent as Mania } from '../../../icons/mania-icon.svg' ;

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

    function getMiniDifficultyIcon(diff) {
        let props = { title: "", className: getDifficultyColor(diff.stars), style: {width: '20px', height: '20px'} };

        switch(diff.mode) {
            case 1:
                return (<Taiko {...props} />)

            case 2:
                return (<Fruits {...props} />)

            case 3:
                return (<Mania {...props} />)

            default:
                return (<Osu {...props} />)
        }
    }

    function getDifficultyIcon(diff, i) {
        let props = { title: "", className: getDifficultyColor(diff.stars), style: {width: '20px', height: '20px'} };

        switch(diff.mode) {
            case 1:
                return (
                    <label>
                        <input type="radio" name="diffIcon" style={{ display: 'none' }} defaultChecked={i === 0 ? true : false} />
                        <div>
                            <Taiko {...props} />
                        </div>
                    </label>
                )

            case 2:
                return (
                    <label>
                        <input type="radio" name="diffIcon" style={{ display: 'none' }} defaultChecked={i === 0 ? true : false} />
                        <div>
                            <Fruits {...props} />
                        </div>
                    </label>
                )

            case 3:
                return (
                    <label>
                        <input type="radio" name="diffIcon" style={{ display: 'none' }} defaultChecked={i === 0 ? true : false} />
                        <div>
                            <Mania {...props} />
                        </div>
                    </label>
                )

            default:
                return (
                    <label>
                        <input type="radio" name="diffIcon" style={{ display: 'none' }} defaultChecked={i === 0 ? true : false} />
                        <div>
                            <Osu {...props} />
                        </div>
                    </label>
                )
        }
    }

    const [source, target] = useSingleton();

    function getShorten() {
        let hardest = [].fill(null, 0, 3);
        for(let map of props.maps) {
            if(!hardest[map.mode])
                hardest[map.mode] = map;
            else if(hardest[map.mode].stars < map.stars)
                hardest[map.mode] = map;
        }
        return hardest.map(h => h ? (
            <div style={{display: "flex", alignItems: "center"}} key={"map-" + h.id + "h"}>
                <Tippy
                    singleton={target}
                    content={getDifficultyTooltip(h)}
                    key={"map-" + h.id}
                >
                    {getDifficultyIcon(h)}
                </Tippy>
                <span style={{color: "white"}}>{props.maps.filter(m => m.mode === h.mode).length}</span>
            </div>
        ) : null);
    }

    return (
        <div className="icons">
            <Tippy 
                singleton={source} 
                delay={0}
                moveTransition='transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                placement="bottom"
            />
            {props.maps.length <= 12 ? props.maps.map((m, i) => {
                return (
                    <div
                        key={"map-" + m.id}
                        onClick={() => {
                            if (!props.mini)
                                props.getBeatmapId(m.id)
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Tippy
                            singleton={target}
                            content={getDifficultyTooltip(m)}
                        >
                            {props.mini ? getMiniDifficultyIcon(m): getDifficultyIcon(m, i)}
                        </Tippy>
                    </div>
                    
                )
            }) : getShorten()}
        </div>
    )
}