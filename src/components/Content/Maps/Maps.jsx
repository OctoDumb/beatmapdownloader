import React, { Component } from 'react';
import Map from './Map.jsx';
import { connect } from 'react-redux';
import { AutoSizer, Masonry, createMasonryCellPositioner, CellMeasurerCache } from 'react-virtualized';
import { changePreviewPlayStatus } from '../../../redux/actions/previewAction';
import './Maps.scss';

class Maps extends Component {   

    constructor(props) {
        super(props);

        this.audioApi = new Audio();
        this.audioApi.preload = 'auto';
        this.state = {
            showInfo: false
        };
    }

    componentDidMount() {
        this.audioApi.addEventListener('ended', () => {
            this.props.changePreviewPlayStatus(false);
        })
    }

    onScroll(e) {
        if(this.state.showInfo) return;

        let { scrollTop, scrollHeight, clientHeight } = e;
        let header = document.getElementById('header');

        if(scrollTop >= 600 && !header.classList.contains('header-scroll'))
            header.classList.add('header-scroll');
        else if(scrollTop < 600 && header.classList.contains('header-scroll'))
            header.classList.remove('header-scroll');

        if(scrollHeight - scrollTop - clientHeight < 200) this.props.nextPage();
    }

    setShowInfo(v) { this.setState({ showInfo: v }); }

    cellRenderer({ index, key }) {
        let mapset = this.props.mapsets[index];
        
        return (
            <Map 
                mapset={mapset}
                key={key}
               audioApi={this.audioApi}
                setShowInfo={v => this.setShowInfo(v)}
            />
        )
    }

    render() {
        const cache = new CellMeasurerCache({
            defaultWidth: 360,
            defaultHeight: 174
        });

        const cellPositioner = createMasonryCellPositioner({
            cellMeasurerCache: cache,
            columnCount: 2,
            columnWidth: 400,
        });

        return (
            <div className="content-maps" id="contentMaps">
                <AutoSizer>
                    {({width, height}) => {
                        return <Masonry 
                            cellCount={this.props.mapsets.length}
                            cellRenderer={this.cellRenderer.bind(this)}
                            cellMeasurerCache={cache}
                            cellPositioner={cellPositioner}
                            width={width}
                            height={height}
                            onScroll={e => this.onScroll(e)}
                        />
                    }}
                </AutoSizer>
            </div>
        )
    }
}
const dispatchStateToProps = dispatch => {
    return {
        changePreviewPlayStatus: (playStatus, beatmapsetId) => dispatch(changePreviewPlayStatus(playStatus, beatmapsetId)),
    }
}

export default connect(null, dispatchStateToProps)(Maps)
