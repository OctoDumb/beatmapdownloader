import React from 'react';
import Tippy, { useSingleton } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/animations/scale-subtle.css';

const mods = {
    EZ: "Easy",
    NF: "NoFail",
    DT: "DoubleTime",
    HR: "HardRock",
    HT: "HalfTime",
    SD: "SuddenDeath",
    PF: "Perfect",
    NC: "Nightcore",
    FL: "Flashlight",
    HD: "Hidden",
    RX: "Relax",
    AP: "AutoPilot",
    SO: "SpunOut",
    TD: "Touch Device",
    FI: "Fade In",
    MR: "Mirror",
    "4K": "4 Keys",
    "5K": "5 Keys",
    "6K": "6 Keys",
    "7K": "7 Keys",
    "8K": "8 Keys",
    "9K": "9 Keys"
};

export default function LeaderboardMods(props) {
    let [ source, target ] = useSingleton();
    if(!props.mods.length) return null;

    return (
        <>
            <Tippy 
                singleton={source}
                delay={0}
                moveTransition='transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                placement='bottom'
            />
            {props.mods.map(m => (
                <Tippy
                    key={`${props.t?'t':''}mod-${props.id}-${m}`}
                    singleton={target}
                    content={mods[m]}
                >
                    <img 
                        className="leaderboard-top-item__flag"
                        src={props.checkModsIcon(m)}
                        alt=""
                    />
                </Tippy>
            ))}
        </>
    )
}