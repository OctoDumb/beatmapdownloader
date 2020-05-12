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

    async load(params, nextPage = false) {
        let { beatmapsets, recommended, cursor } = await window.APIClient.getBeatmapsets(
            Object.assign({}, params, nextPage ? {
                cursor: encodeURI(this.state.cursor)
            } : {})
        );

        this.setState({
            mapsets: beatmapsets,
            recommended, cursor
        }); 
    }

    render() {
        if(this.state.reauth)
            return (
                <Redirect to="/auth" />
            )
        return (
            <div className="content">
                <Search recommended={this.state.recommended} load={this.load.bind(this)}/>
                <Maps mapsets={this.state.mapsets} />
            </div>
        )
    }
}