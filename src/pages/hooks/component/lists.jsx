import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { CaretRightFilled } from '@ant-design/icons';
function Lists () {
   let [ num, setNum ] = useState(0);
   useEffect(() => {
      console.log('num变化了', num)
   }, [ num ])
   return (
      <div>
         <p>我是一个数字{ num }</p> 
         <div>
            <Button onClick = { () => setNum(num+1) }>点击<CaretRightFilled /></Button>
         </div>
      </div>
   )
}
export default Lists;
