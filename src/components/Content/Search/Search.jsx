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
    

    async componentDidUpdate(prevProps, prevState) {
        if(this.state.params !== prevState.params) {
            if(this.loadTimeout)
                clearTimeout(this.loadTimeout);
            this.loadTimeout = setTimeout(() => {
                this.props.load(this.state.params);
                this.loadTimeout = undefined;
            }, 500);
        }
    }

    addQuery(e) {
        let query = e.target.value;

        this.setState({
            params: {
                ...this.state.params,
                query
            }
        });
    }

    addMode(mode) {
        this.setState({
            params: {
                ...this.state.params,
                mode
            }
        });
    }

    addCategory(category) {
        this.setState({
            params: {
                ...this.state.params,
                status: category
            }
        })
    }

    switchGeneral(gn) {
        this.setState({
            params: {
                ...this.state.params,
                general: this.state.params.general.find(g => g === gn) ?
                    this.state.params.general.filter(g => g !== gn) :
                    [...this.state.params.general, gn]
            }
        });
    }

    render () {
        return (
            <div>
                <Query 
                    addQuery={this.addQuery.bind(this)}
                />
                <Params 
                    recommended={this.props.recommended}
                    load={this.props.load}
                    addMode={this.addMode.bind(this)}
                    addCategory={this.addCategory.bind(this)}
                    switchGeneral={this.switchGeneral.bind(this)}
                />
            </div>
        )
    }
}