/*
*  List -- 详情页
*/

import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';






class Child1 extends Component {
    render () {
        return (
            <div>
            组件1
            </div>
        )
    }
}

class Child2 extends Component {
    render () {
        return (
            <div>
            组件222
            </div>
        )
    }
}



class Detail extends Component {
    state = {
        id: 1
    }
    componentDidMount (){
        this.setState({
            id:2
        })
        setTimeout(() => {
            this.setState({
                id:3
            }) 
            console.log('id222222', this.state.id)
        })
        console.log('id', this.state.id)
    }
    render () {
        return (
            <div>
            这里是List下-- 详情页
                <Child1 />
                <Child2 />
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