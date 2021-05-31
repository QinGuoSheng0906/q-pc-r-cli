import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Badge } from 'antd'


import './style.less'

class Study extends Component {
   render (){
      return(
         <div className = 'study-container'>
            <h1 className = 'title'>学习</h1>
         </div>
      )
   }
}

// 读取数据 映射状态管理的数据 其实也就是把Redux中的数据映射到React中的props中去。

export default connect()(Study);