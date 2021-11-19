/**
 *  手写promise
 */

import React, { Component } from 'react';

// function myPromise (constructor) {
//     let _this = this;
//     _this.status = 'pending';
//     _this.value = undefined;
//     _this.reason = undefined;

//     function resolve (value) {
//         if(_this.status == 'pending'){
//             _this.value = value;
//             _this.status = 'resolved'
//         }
//     }
//     function reject (value) {
//         if(_this.status == 'pending'){
//             _this.value = value;
//             _this.status = 'rejected'
//         }
//     }
//     try {
//         constructor(resolve, reject)
//     }catch (e){
//         reject(e)
//     }
// }

// myPromise.prototype.then = function (onFullfilled,onRejected ) {
//     let _this = this;
//     switch(_this.status) {
//     case 'resolved':
//         onFullfilled(_this.value)
//         break;
//     case 'rejected':
//         onRejected(_this.value)
//         break;
//     default:
//         break;
//     }
// }


// class Promise extends Component {
//     componentDidMount (){
//         // eslint-disable-next-line no-unused-vars
//         let p = new myPromise(function (resolve,reject){
//             resolve(1);
//             // reject(2);
//         });  
//         p.then(function (x){
//             console.log('resolve：', x)//1   
//         }, function (y){
//             console.log('reject：', y)//1   
//         })
//     }

//     render () {
//         return (
//             <div>
//                 手写promise
//             </div>
//         )
//     }
// }

class MyPromise {
    constructor (callback){
        let _this = this;
        this.status = 'pending';
        this.value = undefined;

        function resolve (value) {
            if(_this.status == 'pending'){
                _this.value = value;
                _this.status = 'resolved'
            }
        }
        function reject (value) {
            if(_this.status == 'pending'){
                _this.value = value;
                _this.status = 'rejected'
            }
        } 
        try {
            callback(resolve, reject)
        }catch (e){
            reject(e)
        }
    }
    then (onFullfilled,onRejected) {
        if(this.status == 'resolved'){
            onFullfilled(this.value)
        }
        if(this.status == 'rejected'){
            onRejected(this.value)
        }
    }
}


class Promise extends Component {
    state = {

    }
    componentDidMount () {
        let pp = new MyPromise(function (resolve, reject){
            // resolve(1)
            reject(2)
        });
        pp.then(result => {
            console.log('resolve：', result)//1   
        }, reason => {
            console.log('reason', reason)//  2
        })
    } 
    // static getDerivedStateFromProps () {
        
    //     return null;
    // }
    render () {
        return (
            <div>
                手写promise
            </div>
        )
    }
}

export default Promise;


// class MyPromise1 {
//     constructor (executor) { // executor执行器
//         this.status = 'pending' // 等待状态
//         this.value = null // 成功或失败的参数
//         this.fulfilledCallbacks = [] // 成功的函数队列
//         this.rejectedCallbacks = [] // 失败的函数队列
//         const that = this
//         function resolve (value) { // 成功的方法
//             if (that.status === 'pending') {
//                 that.status = 'resolved'
//                 that.value = value
//                 that.fulfilledCallbacks.forEach(myFn => myFn(that.value)) //执行回调方法
//             }
//         }
//         function reject (value) { //失败的方法
//             if (that.status === 'pending') {
//                 that.status = 'rejected'
//                 that.value = value
//                 that.rejectedCallbacks.forEach(myFn => myFn(that.value)) //执行回调方法
//             }
//         }
//         try {
//             executor(resolve, reject)
//         } catch (err) {
//             reject(err)
//         }
//     }
//     then (onFulfilled, onRejected) {
//         if (this.status === 'pending') {
//         // 等待状态，添加回调函数到成功的函数队列
//             this.fulfilledCallbacks.push(() => {
//                 onFulfilled(this.value)
//             })
//             // 等待状态，添加回调函数到失败的函数队列
//             this.rejectedCallbacks.push(() => {
//                 onRejected(this.value)
//             })
//         }
//         if (this.status === 'resolved') { // 支持同步调用
//             console.log('this', this)
//             onFulfilled(this.value)
//         }
//         if (this.status === 'rejected') { // 支持同步调用
//             onRejected(this.value)
//         }
//     }
// }
  
// // 测试
// function fn () {
//     return new MyPromise((resolve, reject) => {
//         setTimeout(() => {
//             if(Math.random() > 0.6) {
//                 resolve(1)
//             } else {
//                 reject(2)
//             }
//         }, 1000)
//     })
// }
// fn().then(
//     res => {
//         console.log('res', res) // res 1
//     },
//     err => {
//         console.log('err', err) // err 2
//     })
  