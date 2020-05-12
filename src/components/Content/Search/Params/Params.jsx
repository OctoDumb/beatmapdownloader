import React, { Component } from 'react';
import './Params.scss';

import { ReactComponent as Osu } from '../../../../icons/standart-icon.svg';
import { ReactComponent as Taiko } from '../../../../icons/taiko-icon.svg';
import { ReactComponent as Fruits } from '../../../../icons/catch-icon.svg';
import { ReactComponent as Mania } from '../../../../icons/mania-icon.svg';

export default class Params extends Component {
    state = {
        params: {
            query: undefined,
            status: undefined,
            mode: null,
            general: [],
            cursor: undefined
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        this.state.params !== prevState.params && await this.props.load(this.state.params)
    }

    setActive (e) {
        e.target.className !== 'content-params-row__option--active' ? e.target.className = 'content-params-row__option--active' : e.target.className = 'content-params-row__option'
    }

    render() {
        return (
            <div className="content-params">
                <div className="content-params-row">
                    <span className="content-params-row__title">Mode</span>
                    <div className="content-params-row__options">
                        <label 
                            className="content-params-row__option" 
                        >
                            <input type="radio" name="params-modes" defaultChecked />
                            <span
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        mode: null
                                    }
                                }); console.log(this.state)}}
                            >
                                Any
                            </span>
                        </label>
                        <label 
                            className="content-params-row__option" 
                        >
                            <input type="radio" name="params-modes"/>
                            <Osu 
                                title="" 
                                style={{width: '28px', height: '28px'}}
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        mode: 0
                                    }
                            }); console.log(this.state)}} 
                            />
                        </label>
                        <label 
                            className="content-params-row__option" 
                        >
                            <input type="radio" name="params-modes"/>
                            <Taiko 
                                title="" 
                                style={{width: '28px', height: '28px'}} 
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        mode: 1
                                    }
                                }); console.log(this.state)}}
                            />
                        </label>
                        <label 
                            className="content-params-row__option" 
                        >
                            <input type="radio" name="params-modes"/>
                            <Fruits 
                                title="" 
                                style={{width: '28px', height: '28px'}} 
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        mode: 2
                                    }
                                }); console.log(this.state)}}
                            />
                        </label>
                        <label 
                            className="content-params-row__option" 
                        >
                            <input type="radio" name="params-modes"/>
                            <Mania 
                                title="" 
                                style={{width: '28px', height: '28px'}}
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        mode: 3
                                    }
                                }); console.log(this.state)}} 
                            />
                        </label>
                    </div>
                </div>
                <div className="content-params-row">
                    <span className="content-params-row__title">General</span>
                    <div className="content-params-row__options">
                        <label className="content-params-row__option">
                            <input type="checkbox" name="params-general" />
                            <span
                                onClick={() => {
                                    !this.state.params.general.find(g => g === 'recommended') ? 
                                    this.setState({
                                        params: {
                                            ...this.state.params,
                                            general: [...this.state.params.general, 'recommended']
                                        }
                                    }) : 
                                    this.setState({
                                        params: {
                                            ...this.state.params,
                                            general: this.state.params.general.filter(g => g !== 'recommended')
                                        }
                                    })
                                    
                                    console.log(this.state)
                                }} 
                            >
                                Recommended difficulty ({this.props.recommended.toFixed(2)})
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="checkbox" name="params-general" />
                            <span
                                onClick={() => {
                                    !this.state.params.general.find(g => g === 'converts') ? 
                                    this.setState({
                                        params: {
                                            ...this.state.params,
                                            general: [...this.state.params.general, 'converts']
                                        }
                                    }) : 
                                    this.setState({
                                        params: {
                                            ...this.state.params,
                                            general: this.state.params.general.filter(g => g !== 'converts')
                                        }
                                    })
                                    console.log(this.state)
                                }} 
                            >
                                Include converted beatmaps
                            </span>
                        </label>
                    </div>
                </div>
                <div className="content-params-row">
                    <span className="content-params-row__title">Categories</span>
                    <div className="content-params-row__options">
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories"/>
                            <span
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        status: 'any'
                                    }
                                }); console.log(this.state)}} 
                            >
                                Any
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" defaultChecked />
                            <span
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        status: 'leaderboard'
                                    }
                                }); console.log(this.state)}} 
                            >
                                Has Leaderboard
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        status: 'ranked'
                                    }
                                }); console.log(this.state)}} 
                            >
                                Ranked
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        status: 'qualified'
                                    }
                                }); console.log(this.state)}} 
                            >
                                Qualified
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        status: 'loved'
                                    }
                                }); console.log(this.state)}} 
                            >
                                Loved
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        status: 'favorites'
                                    }
                                }); console.log(this.state)}} 
                            >
                                Favorites
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        status: 'pending'
                                    }
                                }); console.log(this.state)}} 
                            >
                                Pending and WIP
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        status: 'graveyard'
                                    }
                                }); console.log(this.state)}} 
                            >
                                Graveyard
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span 
                                onClick={() => {this.setState({
                                    params: {
                                        ...this.state.params,
                                        status: 'my'
                                    }
                                }); console.log(this.state)}} 
                            >
                                My Maps
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}