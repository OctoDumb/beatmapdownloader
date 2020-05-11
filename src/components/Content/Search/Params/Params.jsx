import React, { Component } from 'react';
import './Params.scss';

import { ReactComponent as Osu } from '../../../../icons/standart-icon.svg';
import { ReactComponent as Taiko } from '../../../../icons/taiko-icon.svg';
import { ReactComponent as Fruits } from '../../../../icons/catch-icon.svg';
import { ReactComponent as Mania } from '../../../../icons/mania-icon.svg';

export default class Params extends Component {
    state = {
        recommended: 7.06
    };

    setActive (e) {
        e.target.className !== 'content-params-row__option--active' ? e.target.className = 'content-params-row__option--active' : e.target.className = 'content-params-row__option'
    }

    render() {
        return (
            <div className="content-params">
                <div className="content-params-row">
                    <span className="content-params-row__title">Mode</span>
                    <div className="content-params-row__options">
                        <label className="content-params-row__option">
                            <input type="radio" name="params-modes" defaultChecked />
                            <span>Any</span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-modes"/>
                            <Osu title="" style={{width: '28px', height: '28px'}} />
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-modes"/>
                            <Taiko title="" style={{width: '28px', height: '28px'}} />
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-modes"/>
                            <Fruits title="" style={{width: '28px', height: '28px'}} />
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-modes"/>
                            <Mania title="" style={{width: '28px', height: '28px'}} />
                        </label>
                    </div>
                </div>
                <div className="content-params-row">
                    <span className="content-params-row__title">General</span>
                    <div className="content-params-row__options">
                        <label className="content-params-row__option">
                            <input type="checkbox" name="params-general" />
                            <span>Recommended difficulty ({this.state.recommended})</span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="checkbox" name="params-general" />
                            <span>Include converted beatmaps</span>
                        </label>
                    </div>
                </div>
                <div className="content-params-row">
                    <span className="content-params-row__title">Categories</span>
                    <div className="content-params-row__options">
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories"/>
                            <span>Any</span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" defaultChecked />
                            <span>Has Leaderboard</span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span>Ranked</span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span>Qualified</span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span>Loved</span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span>Favorites</span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span>Pending and WIP</span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span>Graveyard</span>
                        </label>
                        <label className="content-params-row__option">
                            <input type="radio" name="params-categories" />
                            <span>My Maps</span>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}