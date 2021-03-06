import React, { Component } from 'react';
import './Params.scss';
import { addMode, addCategory, switchGeneral } from '../../../../redux/actions/searchParamsActions';
import { connect } from 'react-redux';

import { ReactComponent as Osu } from '../../../../icons/standart-icon.svg';
import { ReactComponent as Taiko } from '../../../../icons/taiko-icon.svg';
import { ReactComponent as Fruits } from '../../../../icons/catch-icon.svg';
import { ReactComponent as Mania } from '../../../../icons/mania-icon.svg';

class Params extends Component {
    setActive (e) {
        e.target.className = 'content-params-row__option' + e.target.className.endsWith("active") ? '' : "--active";
    }

    render() {
        return (
            <div className="content-params">
                <div className="content-params-row" id="mode">
                    <span className="content-params-row__title">Mode</span>
                    <div className="content-params-row__options">
                        <label 
                            className="content-params-row__option" 
                        >
                            <input type="radio" name="params-modes" defaultChecked />
                            <span
                                onClick={() => {this.props.addMode(null)}}
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
                                onClick={() => {this.props.addMode(0)}} 
                            />
                        </label>
                        <label 
                            className="content-params-row__option" 
                        >
                            <input type="radio" name="params-modes"/>
                            <Taiko 
                                title="" 
                                style={{width: '28px', height: '28px'}} 
                                onClick={() => {this.props.addMode(1)}}
                            />
                        </label>
                        <label 
                            className="content-params-row__option" 
                        >
                            <input type="radio" name="params-modes"/>
                            <Fruits 
                                title="" 
                                style={{width: '28px', height: '28px'}} 
                                onClick={() => {this.props.addMode(2)}}
                            />
                        </label>
                        <label 
                            className="content-params-row__option" 
                        >
                            <input type="radio" name="params-modes"/>
                            <Mania 
                                title="" 
                                style={{width: '28px', height: '28px'}}
                                onClick={() => {this.props.addMode(3)}} 
                            />
                        </label>
                    </div>
                </div>
                <div className="content-params-row" id="general">
                    <span className="content-params-row__title">General</span>
                    <div className="content-params-row__options">
                        <label className="content-params-row__option">
                            <input type="checkbox" name="params-general" />
                            <span
                                onClick={() => {this.props.switchGeneral('recommended')}} 
                            >
                                Recommended difficulty ({this.props.recommended.toFixed(2)})
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="checkbox" name="params-general" />
                            <span
                                onClick={() => {this.props.switchGeneral('converts')}} 
                            >
                                Include converted beatmaps
                            </span>
                        </label>
                    </div>
                </div>
                <div className="content-params-row" id="categories">
                    <span className="content-params-row__title">Categories</span>
                    <div className="content-params-row__options">
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories"/>
                            <span
                                onClick={() => {this.props.addCategory('any')} }
                            >
                                Any
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" defaultChecked />
                            <span
                                onClick={() => {this.props.addCategory('leaderboard')}} 
                            >
                                Has Leaderboard
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.props.addCategory('ranked')}} 
                            >
                                Ranked
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.props.addCategory('qualified')}} 
                            >
                                Qualified
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.props.addCategory('loved')}} 
                            >
                                Loved
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.props.addCategory('favourites')}} 
                            >
                                Favourites
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.props.addCategory('pending')}} 
                            >
                                Pending and WIP
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span
                                onClick={() => {this.props.addCategory('graveyard')}} 
                            >
                                Graveyard
                            </span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span 
                                onClick={() => {this.props.addCategory('mine')}} 
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

const mapStateToProps = state => {
    return {
        status: state.category,
        mode: state.mode,
        general: state.general
    }
}

const dispatchStateToProps = dispatch => {
    return {
        addMode: mode => dispatch(addMode(mode)),
        addCategory: category => dispatch(addCategory(category)),
        switchGeneral: gn => dispatch(switchGeneral(gn))
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Params)