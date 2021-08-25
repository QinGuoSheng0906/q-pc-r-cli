/**
* 
* 秦国胜
* 2020/05/20
*/

import React, { useState  } from 'react'; // useEffect
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSpin } from '@/stores/actions/spin-info';
import { Button } from 'antd';

function Hooks () {
    // let { modal, updateSpin } = props;
    const[ text ] = useState('这是一个文本'); // setText
    const [ count , setCount ] = useState(0);
    const handleClick = () => {
        setTimeout(() => {
            setCount((prevCount) => prevCount + 1);
        }, 3000)
    }
    function handleClickSync () {
        setCount(count + 1);
    }
    return (
        <div className = 'p-l-10'>
            这里是hook是， { text }
            <div>conunt: { count  }</div>
            <div className = 'p-b-10'>
                <Button type = 'primary' onClick = { handleClick }>setTemout</Button>
            </div>
           
            <Button type = 'primary' onClick = { handleClickSync }>点击</Button>
        </div>
    );
}


function propMap (state) {
    return {
        modal: state.modal
    };
}

function propMapDispatch (dispatch) {
    return {
        updateSpin: (data) => dispatch(updateSpin(data))
    };
}


Hooks.propTypes = {
    modal: PropTypes.object
};

export default connect(
    propMap,
    propMapDispatch
)(Hooks);