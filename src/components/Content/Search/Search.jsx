import React, { Component } from 'react';
import Query from './Query/Query';
import Params from './Params/Params';

export default class Search extends Component {
    render () {
        return (
            <div>
                <Query />
                <Params recommended={this.props.recommended} />
            </div>
        )
    }
}