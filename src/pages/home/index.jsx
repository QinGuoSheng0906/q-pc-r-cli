/*
*  Home
*/

import React, { Component } from 'react';
import{ connect } from 'react-redux';

import PropTypes from 'prop-types';

import { updateHome } from '@actions/home';


import { Button } from 'antd';

class Home extends Component {
   onClick = () => {
       let { dispatch } = this.props;
       dispatch(updateHome({
           list: [ 1,2,3 ]
       }))
   }
   render () {
       //    let { home } = this.props;
       //    console.log('home', home);
       return (
           <div>
            这里是首页111
               <div>
                   <Button type = 'primary' onClick = { this.onClick }>点击切换状态</Button>
               </div>
           </div>
       )
   }
}
function propMap (state) {
    return {
        home: state.home
    };
}

Home.propTypes = {
    home: PropTypes.object,
    dispatch: PropTypes.func
};
export default connect(propMap)(Home) ;