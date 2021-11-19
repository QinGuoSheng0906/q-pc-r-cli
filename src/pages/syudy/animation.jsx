/**
 * 动画大全
 * 秦国胜
 * 2021/10/28
 */
import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';

import { objEnumArray, arrayFlat } from '@lib/utils'

  
import './styles/animation.less';


class Animation extends Component {
    componentDidMount () {
        // this.getInfo()
        let arrays = [ 
            -1,0,
            [ 1,2 ],
            3,4,
            [ 
                5,
                [ 
                    6, 7
                ] 
            ],
            [
                [
                    [
                        8,9
                    ]
                ]
            ],
            [
                [
                    [
                        [
                            10, 11
                        ]
                    ]
                ]
            ],
            [
                [
                    [
                        [
                            [
                                12,13
                            ]
                        ]
                    ]
                ]
            ]
        ]
        console.log('arrayFlat22', arrayFlat(arrays, 1))
        // console.log('arrayFlat22', arrayFlat(arrays, 2))
        // console.log('arrayFlat22', arrayFlat(arrays, 3))
        // console.log('arrayFlat22', arrayFlat(arrays, 4))
        // console.log('arrayFlat22', arrayFlat(arrays, 5))
        // console.log('arrayFlat333', arrayFlat(arrays))
    }
    getInfo = () => {
        // return await new Promise((res) => {
        //     res({ status: 200 })
        // });

        let enmu = {
            '1': '值一'
        }
        console.log(objEnumArray(enmu))
        async function asyncPrint (value, ms) {
            return await new Promise((resolve) => {
                setTimeout(resolve(ms), ms);
            });
            // console.log(value);
        }
       
        asyncPrint('hello world', 50).then((res) => {
            console.log('res', res )
        });
    }

    func = () => {
        let obj = {
            data: {
                id: 1001,
                title: '这是一个测试'
            }
        }
    
        let newObj = new Proxy(obj,{
    
        })
        console.log(newObj.data)
    
    }
    

    render () {
        return (
            <div className = 'animation-container'>
                <div className = 'com-container df-ac-jc font-container'>
                    <div className = 'shining'>
                    fushigi no monogatari
                    </div>
                </div>
                <div className = 'com-container df-ac-jc font-shine-container'>
                    <div className = 'shine'>
                    fushigi no monogatari
                    </div>
                </div>
                <div className = 'com-container fan-container'>
                    <div className = 'fan-content'>
                        <div className = 'fan fan-1' />
                        <div className = 'fan fan-2' />
                    </div>
                  
                </div>
                <div className = 'com-container df-ac-jc button-container'>
                    <div className = 'button-content c-p'>
                        <i className = 'dot dot-1' />
                        <i className = 'dot dot-2' />
                        <i className = 'dot dot-3' />
                        <i className = 'dot dot-4' />
                        按钮
                    </div>
                </div>
                <div className = 'com-container df-ac-jc loading-container'>
                    <div className = 'loading-content' />
                </div>
                <div className = 'com-container df-ac-jc'>
                    <div className = 'load-loading-container'>
                        请稍后 <span className = 'dotting' />
                    </div>
                </div>
            </div>
        )
    }
}
 
function propMap (state) {
    return {
        spinInfo: state.spinInfo
    };
}
 
Animation.propTypes = {
    dispatch: PropTypes.func
};
export default connect(propMap)(Animation) ;