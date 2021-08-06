/*
*  order -- 详情页
*/

import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';


class Detail extends Component {
    render () {
        return (
            <div>
            这里是order下-- 详情页
            </div>
        )
    }
}

function propMap (state) {
    return {
        spinInfo: state.spinInfo
    };
}

Detail.propTypes = {
    spinInfo: PropTypes.object
};
export default connect(propMap)(Detail) ;