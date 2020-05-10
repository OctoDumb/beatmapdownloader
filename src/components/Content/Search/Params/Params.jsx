import React, { Component } from 'react';
import './Params.scss';

export default class Params extends Component {
    setActive (e) {
        e.target.className !== 'content-params-row__option--active' ? e.target.className = 'content-params-row__option--active' : e.target.className = 'content-params-row__option'
    }

    render() {
        return (
            <div className="content-params">
                <div className="content-params-row">
                    <span className="content-params-row__title">General</span>
                    <div className="content-params-row__options">
                        <label className="content-params-row__option">
                            <input type="checkbox" name="params-general" />
                            <span>{`Recommended difficulty ${7.05}`}</span>
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
                            <input type="radio" name="params-categories" />
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