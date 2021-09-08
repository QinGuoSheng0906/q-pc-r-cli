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