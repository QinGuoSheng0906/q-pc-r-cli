import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
// import { CaretRightFilled } from '@ant-design/icons';

function Lists () {
   let [ num, setNum ] = useState(0);
   useEffect(() => {
      console.log('num变化了', num)
      setTimeout(() => {
         setNum(2);
      },1000);
      // 清除副作用
      return () => {
         console.log('执行清除操作');
      }
   }, [ num ]); // 传入空数组 告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行
   
   return (
      <div>
         <p>我是一个数字{ num }</p> 
         <div>
            <Button onClick = { () => setNum(num+1) }>点击</Button>
         </div>
      </div>
   )
}
export default Lists;
