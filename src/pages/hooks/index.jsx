/**
* 
* 秦国胜
* 2020/05/20
*/

import React, { useState  } from 'react'; // useEffect
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { modalUpdate } from '@actions/modal';
import {  } from 'antd';

function Hooks () {
    // let { modal, modalUpdate } = props;
    const[ text ] = useState('这是一个文本'); // setText
    return (
        <div>这里是hook是， { text }</div>
    );
}


function propMap (state) {
    return {
        modal: state.modal
    };
}

function propMapDispatch (dispatch) {
    return {
        modalUpdate: (data) => dispatch(modalUpdate(data))
    };
}


Hooks.propTypes = {
    modal: PropTypes.object
};

export default connect(
    propMap,
    propMapDispatch
)(Hooks);