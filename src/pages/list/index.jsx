/*
*  List
*/

import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';


class List extends Component {
    render () {
        return (
            <div>
            这里是List页
              
            </div>
        )
    }
}

function propMap (state) {
    return {
        home: state.home
    };
}

List.propTypes = {
    home: PropTypes.object,
    dispatch: PropTypes.func
};
export default connect(propMap)(List) ;