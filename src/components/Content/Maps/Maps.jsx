import React, { Component } from 'react';
import Map from './Map.jsx'
import './Maps.scss';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            maps: [
                {
                    background: "https://assets.ppy.sh/beatmaps/396221/covers/cover.jpg?1521103997",
                    status: "Loved",
                    title: "Galaxy Collapse",
                    artist: "Kurokotei",
                    mapper: "Doomsday is Bad",
                    source: "東方Project",
                    maps: [
                        {
                            "version": "Easy",
                            "stars": 1.5
                        },
                        {
                            "version": "Normal",
                            "stars": 2.4
                        },
                        {
                            "version": "Hard",
                            "stars": 3.6
                        },
                        {
                            "version": "Insane",
                            "stars": 5
                        },
                        {
                            "version": "Expert",
                            "stars": 6
                        },
                        {
                            "version": "Expert+",
                            "stars": 7
                        }
                    ]
                },
                {
                    background: "https://assets.ppy.sh/beatmaps/400078/covers/cover.jpg?1521104370",
                    status: "Ranked",
                    title: "Galaxy Collapse",
                    artist: "Kurokotei",
                    mapper: "Mat",
                    source: "東方Project"
                },
                {
                    background: "https://assets.ppy.sh/beatmaps/328117/covers/cover.jpg?1521096706",
                    status: "Ranked",
                    title: "Galaxy Collapse",
                    artist: "Kurokotei",
                    mapper: "Kurokotei",
                    source: "東方Project"
                },
            ]
        }
    }
    render() {
        return (
            <div className="content-maps">
                {this.state.maps.map(m => {
                    return <Map {...m} />
                })}
            </div>
        )
    }
}