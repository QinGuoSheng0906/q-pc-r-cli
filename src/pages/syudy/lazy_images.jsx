/* eslint-disable no-empty-function */
/**
 * 导入导出文件
 */

import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';
 
import { PageTitle } from '@components/index'
import { Button } from 'antd'


import img1 from '@images/bg-2.jpg';
import img2 from '@images/bg-4.jpg';
   
class LazyImages extends Component {
    componentDidMount () {
        this.imgOnLoad();
    }
    // 图片懒加载
    imgOnLoad = () => {
        const imgs = document.querySelectorAll('img[data-src]')
        const config = {
            rootMargin: '0px',
            threshold: 0
        }
        let observer = new IntersectionObserver((entries, self) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let img = entry.target
                    let src = img.dataset.src
                    if (src) {
                        img.src = src
                        img.removeAttribute('data-src')
                    }
                    // 解除观察
                    self.unobserve(entry.target)
                }
            })
        }, config)
 
        imgs.forEach((image) => {
            observer.observe(image)
        })
    }
    // 回到顶部
    scrollToTop = () =>  {
        // const c = document.documentElement.scrollTop || document.body.scrollTop
        const c = document.getElementsByClassName('layout-content')[0]
        const top = c.scrollTop
        console.log('c', c)
        if (top > 0) {
            window.requestAnimationFrame(this.scrollToTop)
            c.scrollTo(0, c - c / 8)
        }
    }
    render () {
        return(
            <div className = 'import-export-files'>
                <PageTitle title = '图片懒加载' />
                <div style = { { height: '1000px' } } />
                <div className = 'm-t-20'>
                    <img data-src = { img1 } width = '100%' />
                </div>
                <div  className = 'm-t-20'>
                    <img data-src = { img2 }  width = '100%' />
                </div>
                <Button onClick = { this.scrollToTop }>回到顶部</Button>
            </div>
        )
       
    }
}
 
function propMap (state) {
    return {
        spinInfo: state.spinInfo
    };
}
  
LazyImages.propTypes = {
    dispatch: PropTypes.func
};
export default connect(propMap)(LazyImages) ;