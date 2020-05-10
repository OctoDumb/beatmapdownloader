import React, { Component } from 'react';
import './Sort.scss';

export default class Sort extends Component {
    setActive (e) {
        e.target.className !== 'content-sort-row__option--active' ? e.target.className = 'content-sort-row__option--active' : e.target.className = 'content-sort-row__option'
    }

    render() {
        return (
            <div className="content-sort">
                <div className="content-sort-row">
                    <span className="content-sort-row__title">General</span>
                    <div className="content-sort-row__options">
                    <label className="content-sort-row__option">
                            <input type="checkbox" name="sort-general" />
                            <span>{`Recommended difficulty ${7.05}`}</span>
                        </label>
                        <label className="content-sort-row__option">
                            <input type="checkbox" name="sort-general" />
                            <span>Include converted beatmaps</span>
                        </label>
                    </div>
                </div>
                <div className="content-sort-row">
                    <span className="content-sort-row__title">Categories</span>
                    <div className="content-sort-row__options">
                        <label className="content-sort-row__option">
                            <input type="radio" name="sort-categories" checked/>
                            <span>Any</span>
                        </label>
                        <label className="content-sort-row__option">
                            <input type="radio" name="sort-categories" />
                            <span>Has Leaderboard</span>
                        </label>
                        <label className="content-sort-row__option">
                            <input type="radio" name="sort-categories" />
                            <span>Ranked</span>
                        </label>
                        <label className="content-sort-row__option">
                            <input type="radio" name="sort-categories" />
                            <span>Qualified</span>
                        </label>
                        <label className="content-sort-row__option">
                            <input type="radio" name="sort-categories" />
                            <span>Loved</span>
                        </label>
                        <label className="content-sort-row__option">
                            <input type="radio" name="sort-categories" />
                            <span>Favorites</span>
                        </label>
                        <label className="content-sort-row__option">
                            <input type="radio" name="sort-categories" />
                            <span>Pending and WIP</span>
                        </label>
                        <label className="content-sort-row__option">
                            <input type="radio" name="sort-categories" />
                            <span>Graveyard</span>
                        </label>
                        <label className="content-sort-row__option">
                            <input type="radio" name="sort-categories" />
                            <span>My Maps</span>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}