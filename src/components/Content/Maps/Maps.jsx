import React, { Component } from 'react';
import Map from './Map.jsx';
import { connect } from 'react-redux';
import { changePreviewPlayStatus } from '../../../redux/actions/previewAction';
import './Maps.scss';

class Maps extends Component {
    state = {
        showInfo: false
    };

    constructor(props) {
        super(props);

        this.audioApi = new Audio();
        this.audioApi.preload = 'auto';
    }

    componentDidMount() {
        this.audioApi.addEventListener('ended', () => {
            this.props.changePreviewPlayStatus(false);
        })
    }

    onScroll(e) {
        if(this.state.showInfo) return;

        let { scrollTop, scrollHeight, clientHeight } = e.nativeEvent.target;
        let header = document.getElementById('header');

        if(scrollTop >= 600 && !header.classList.contains('header-scroll'))
            header.classList.add('header-scroll');
        else if(scrollTop < 600 && header.classList.contains('header-scroll'))
            header.classList.remove('header-scroll');

        if(scrollHeight - scrollTop - clientHeight < 200) this.props.nextPage();
    }

    setShowInfo(v) { this.setState({ showInfo: v }); }

    render() {
        return (
            <div className="content-maps" id="contentMaps" onScroll={(e) => this.onScroll(e)}>
                {this.props.mapsets.map(m => {
                    return (
                        <Map
                            mapset={m}
                            key={"mapset-" + m.id}
                            audioApi={this.audioApi}
                            setShowInfo={(v) => this.setShowInfo(v)}
                        />
                    ) 
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const dispatchStateToProps = dispatch => {
    return {
        changePreviewPlayStatus: (playStatus, beatmapsetId) => dispatch(changePreviewPlayStatus(playStatus, beatmapsetId)),
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Maps)