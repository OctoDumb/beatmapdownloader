import React, { Component, createContext } from 'react';
import Query from './Query/Query';
import Params from './Params/Params';

export const ParamsContext = createContext();

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            params: {
                query: undefined,
                status: undefined,
                mode: null,
                general: [],
                cursor: undefined
            }
        }

        this.addQuery = this.addQuery.bind(this);
    }
    

    async componentDidUpdate(prevProps, prevState) {
        this.state.params !== prevState.params && await this.props.load(this.state.params)
    }

    addQuery(e) {
        let string = e.target.value;

        this.setState({
            params: {
                ...this.state.params,
                query: string
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

    addGeneral(general) {
        !this.state.params.general.find(g => g === general) ? 
        this.setState({
            params: {
                ...this.state.params,
                general: [...this.state.params.general, general]
            }
        }) : 
        this.setState({
            params: {
                ...this.state.params,
                general: this.state.params.general.filter(g => g !== general)
            }
        })
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
                    addGeneral={this.addGeneral}
                />
            </div>
        )
    }
}