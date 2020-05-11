import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Content.scss';
import Search from './Search/Search';
import Maps from './Maps/Maps';

export default class Content extends Component {
    state = {
        mapsets: [],
        recommended: 0.00,
        reauth: false
    };

    componentDidMount() {
        if(!window.APIClient.logged)
            this.setState({ reauth: true });
        else
            this.load();
    }

    async load() {
        let { beatmapsets, recommended } = await window.APIClient.getBeatmapsets();

        this.setState({
            mapsets: beatmapsets,
            recommended
        }); 
    }

    render() {
        if(this.state.reauth)
            return (
                <Redirect to="/auth" />
            )
        return (
            <div className="content">
                <Search recommended={this.state.recommended} />
                <Maps mapsets={this.state.mapsets} />
            </div>
        )
    }
}