import React, { Component, createContext } from 'react';
import Query from './Query/Query';
import Params from './Params/Params';

export const ParamsContext = createContext();

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            params: {
                query: "",
                status: 'leaderboard',
                mode: null,
                general: []
            }
        }
    }
    

    render() {
        return (
            <div id='header'>
                <Query />
                <Params recommended={this.props.recommended} />
            </div>
        )
    }
}

