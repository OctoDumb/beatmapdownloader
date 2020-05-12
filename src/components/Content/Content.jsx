import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Content.scss';
import Search from './Search/Search';
import Maps from './Maps/Maps';
import { connect } from 'react-redux';


class Content extends Component {
    state = {
        mapsets: [],
        recommended: 0.00,
        reauth: false,
        loading: false
    };

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if(this.loadTimeout)
                clearTimeout(this.loadTimeout);
            this.loadTimeout = setTimeout(() => {
                this.load(this.props);
                this.loadTimeout = undefined;
            }, 500);
        }
        
    }

    componentDidMount() {
        console.log(this.props);
        if(!window.APIClient.logged)
            this.setState({ reauth: true });
        else
            this.load();
    }

    async load(params, nextPage = false) {
        if(this.state.loading) return;
        this.setState({ loading: true });
        let { beatmapsets, recommended, cursor } = await window.APIClient.getBeatmapsets(
            Object.assign({}, params, nextPage ? {
                cursor: this.state.cursor
            } : {})
        );

        this.setState({
            loading: false,
            mapsets: nextPage ? [...this.state.mapsets, ...beatmapsets] : beatmapsets,
            recommended, cursor
        }); 
    }

    nextPage() {
        this.load(this.props, true);
    }

    render() {
        if(this.state.reauth)
            return (
                <Redirect to="/auth" />
            )
        return (
            <div className="content">
                <Search recommended={this.state.recommended} />
                <Maps nextPage={this.nextPage.bind(this)} mapsets={this.state.mapsets} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        status: state.search.status,
        mode: state.search.mode,
        general: state.search.general,
        query: state.search.query
    }
}

const dispatchStateToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, dispatchStateToProps)(Content)