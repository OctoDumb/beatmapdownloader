import React, { Component } from 'react';
import './Query.scss';
import { addQuery } from '../../../../redux/actions/searchParamsActions';
import { connect } from 'react-redux';

class Query extends Component {
    render() {
        return (
            <div className="content-query">
                <input className="content-query__input" type="text" placeholder="Search" onChange={this.props.addQuery} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const dispatchStateToProps = dispatch => {
    return {
        addQuery: e => dispatch(addQuery(e)),
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Query)