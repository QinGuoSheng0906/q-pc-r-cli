/*
*  Home
*/

import React, { Component } from 'react';
import{ connect } from 'react-redux';

import PropTypes from 'prop-types';

import { updateHome } from '@actions/home';


// import { Button } from 'antd';

import './style.less';

import link1 from '@assets/images/nj/link-1.png';
import industry from '@assets/images/nj/industry-1.png';

class Home extends Component {
    componentDidMount () {
        
        let list = [
            new Promise((resolve) => {
                resolve('请求1')
            }),
            new Promise((resolve) => {
                resolve('请求2')
            }),
            new Promise((resolve) => {
                resolve('请求3')
            }),
            new Promise((resolve) => {
                resolve('请求4')
            }),
            new Promise((resolve) => {
                resolve('请求5')
            }),
            new Promise((resolve) => {
                resolve('请求6')
            }),
            new Promise((resolve) => {
                resolve('请求7')
            })
        ]
        let p = this.limitAjax(list);
        p.then((res) => {
            console.log('p',res );
        })
       
    } 
    // 限制并发请求
    limitAjax = (list = [], maxNum = 2) => {
        if(!list || list.length < 1) return Promise.resolve(list);
        let run = [];
        let result = [];
        let num = 0;
        let p = () => {
            if(num >= list.length) {
                return Promise.resolve(); //最后一个resolve状态，会进入外层返回Promise.then
            }
            let e = list[num++];
            console.log('e', e)
            e.then(() => run.splice(run.indexOf(e),1)) 
            run.push(e);
            result.push(e);
            if(run.length >= maxNum) { 
                return Promise.race(run).then(p); //return返回
            } else {
                return Promise.resolve().then(p); //改写一下保证then链式调用
            }
        }
        return p().then(() => Promise.all(result)); //只有当array结束，最后一个resolve才会进入then
    }
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
            <div className = 'home-container'>
                <div className = 'nj-common-container'>
                    { /* <!-- banner --> */ }
                    <div className = 'nj-banner-container'>
                        <div className = 'nj-banner-content'>
                            <div className = 'f-clear nj-banner-search'>
                                <div className = 'fl nj-search-content'>
                                    <i className = 'nj-search-icon'  />
                                    <input className = 'nj-banner-input' placeholder = '搜索您想要的服务' />
                                </div>
                                <div  className = 'fl nj-banner-btn'>
                                搜索
                                </div>
                            </div>
                        </div>
                  
                    </div>
                    { /* <!-- 统计信息 --> */ }
                    <div className = 'nj-statistics'>
                        <ul className = 'w-1200 f-clear nj-statistics-content'>
                            <li className = 'item'>服务机构&nbsp;<span className = 'num'>835</span>&nbsp;家</li>
                            <li className = 'item'>服务产品&nbsp;<span className = 'num'>835</span>&nbsp;家</li>
                            <li className = 'item'>双创载体&nbsp;<span className = 'num'>835</span>&nbsp;家</li>
                            <li className = 'item'>企业上云&nbsp;<span className = 'num'>835</span>&nbsp;家</li>
                            <li className = 'item'>企业服务&nbsp;<span className = 'num'>835</span>&nbsp;次</li>
                            <li className = 'item'>累计成交&nbsp;<span className = 'num'>835</span>&nbsp;万元</li>
                            <li className = 'item'>用户总量&nbsp;<span className = 'num'>835</span>&nbsp;万人</li>
                        </ul>
                    </div>
                    <div className = 'nj-main'>
                        <div className = 'w-1200' >
                            { /* 项目平台 */ }
                            <div  className = 'bg-fff m-b-16 nj-ietm-category'>
                                <div className = 'category-item'>
                                    <h6 className = 'category-title'>
                                        <span>
                                            <span  className = 'block'>知识产权数字</span> 
                                            <span  className = 'block'>公共服务平台</span> 
                                        </span> 
                                    </h6>
                                    <div className = 'category-container'>
                                        <div className = 'category-content'>
                                            <div className = 'ellipsis-2' >
                                        商标服务、专利服务、项目申报、高企认定、涉外知识产的发挥地方烦得很地方好地方
                                            </div>
                                        </div>
                                        <div className = 'category-foot'>
                                            <a  className = 'category-foot-link' target = '_blank' href = '#'
                                                rel = 'noopener norefferrer'
                                            >
                                        进入平台 <span className = 'category-icon'> </span>
                                            </a>
                                        </div>
                                    </div>
                               
                                </div>
                                <div className = 'category-item'>
                                    <h6 className = ' category-title'>
                                        <span>
                                            <span className = 'block'>园区企业</span> 
                                            <span className = 'block'>公共服务平台</span> 
                                        </span>
                                    
                                    </h6>
                                    <div className = 'category-container'>
                                        <div className = 'category-content'>
                                            <div className = 'ellipsis-2' >
                                        商标服务、专利服务、项目申报、高企认定、涉外知识产的发挥地方烦得很地方好地方
                                            </div>
                                        </div>
                                        <div className = 'category-foot'>
                                            <a  className = 'category-foot-link' target = '_blank' href = '#'
                                                rel = 'noopener norefferrer'
                                            >
                                        进入平台 <span className = 'category-icon' />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'category-item'>
                                    <h6 className = 'category-title'>
                                        <span>
                                            <span className = 'block'>数字版权文创</span> 
                                            <span className = 'block'>公共服务平台</span> 
                                        </span>
                                    
                                    </h6>
                                    <div className = 'category-container'>
                                        <div className = 'category-content'>
                                            <div className = 'ellipsis-2' >
                                        商标服务、专利服务、项目申报、高企认定、涉外知识产的发挥地方烦得很地方好地方
                                            </div>
                                        </div>
                                        <div className = 'category-foot'>
                                            <a  className = 'category-foot-link' target = '_blank' href = '#'
                                                rel = 'noopener norefferrer'
                                            >
                                        进入平台 <span className = 'category-icon' />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'category-item'>
                                    <h6 className = 'category-title'>
                                        <span>
                                            <span className = 'block'>质量基础设施</span> 
                                            <span className = 'block'>公共服务平台</span> 
                                        </span>
                                    </h6>
                                    <div className = 'category-container'>
                                        <div className = 'category-content'>
                                            <div className = 'ellipsis-2' >
                                        商标服务、专利服务、项目申报、高企认定、涉外知识产的发挥地方烦得很地方好地方
                                            </div>
                                        </div>
                                        <div className = 'category-foot'>
                                            <a  className = 'category-foot-link' target = '_blank' href = '#'
                                                rel = 'noopener norefferrer'
                                            >
                                        进入平台 <span className = 'category-icon' />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'category-item'>
                                    <h6 className = 'category-title'>
                                        <span>
                                            <span className = 'block'>人才教育</span> 
                                            <span className = 'block'>公共服务平台</span> 
                                        </span>
                                    
                                    </h6>
                                    <div className = 'category-container'>
                                        <div className = 'category-content'>
                                            <div className = 'ellipsis-2' >
                                        商标服务、专利服务、项目申报、高企认定、涉外知识产的发挥地方烦得很地方好地方
                                            </div>
                                        </div>
                                        <div className = 'category-foot'>
                                            <a  className = 'category-foot-link' target = '_blank' href = '#'
                                                rel = 'noopener norefferrer'
                                            >
                                        进入平台 <span className = 'category-icon' />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { /* 新闻信息 */ }
                            <div className = 'bg-fff m-b-16 nj-news' >
                                <div className = 'nj-news-banner' >
                                    <div className = 'news-banner-content' />
                                    <div className = 'news-banner-title'>
                                        <div className = 'news-banner-msg'>
                                            <div className = 'ellipsis news-banner-text'>田向利宋朝华在内江调研</div>
                                            <div className = 'dot-btn'>
                                                <span className = 'dot dot-active' />
                                                <span className = 'dot' />
                                                <span className = 'dot' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'nj-news-content'>
                                    <div className = 'nj-news-nav'>
                                        <ul className = 'nj-news-department'>
                                            <li className = 'department-item department-item-active'>财政局</li>
                                            <li className = 'department-item'>生态环境局</li>
                                            <li className = 'department-item'>经发局</li>
                                            <li className = 'department-item'>科技局</li>
                                            <li className = 'department-item'>市监局</li>
                                        </ul>
                                        <a className = 'more-btn' target = '_blank' 
                                            href = '#'
                                            rel = 'noopener norefferrer'
                                        >更多&gt;&gt;</a>
                                    </div>
                                    <div className = 'nj-news-list-content'>
                                        <ul className = 'nj-news-list'>
                                            <li className = 'news-item' >
                                                <div className = 'df-ac-js'>
                                                    <div className = 'ellipsis news-list-title'>标题标题标题标题标题标题标题标题标题</div>
                                                    <div className = 'news-time'>2021.08.31</div>
                                                </div>
                                            </li>
                                            <li className = 'news-item' >
                                                <div className = 'df-ac-js'>
                                                    <div className = 'ellipsis news-list-title'>标题标题标题标题标题标题标题标题标题</div>
                                                    <div className = 'news-time'>2021.08.31</div>
                                                </div>
                                            </li>
                                            <li className = 'news-item' >
                                                <div className = 'df-ac-js'>
                                                    <div className = 'ellipsis news-list-title'>标题标题标题标题标题标题标题标题标题</div>
                                                    <div className = 'news-time'>2021.08.31</div>
                                                </div>
                                            </li>
                                            <li className = 'news-item' >
                                                <div className = 'df-ac-js'>
                                                    <div className = 'ellipsis news-list-title'>标题标题标题标题标题标题标题标题标题</div>
                                                    <div className = 'news-time'>2021.08.31</div>
                                                </div>
                                            </li>
                                            <li className = 'news-item' >
                                                <div className = 'df-ac-js'>
                                                    <div className = 'ellipsis news-list-title'>标题标题标题标题标题标题标题标题标题</div>
                                                    <div className = 'news-time'>2021.08.31</div>
                                                </div>
                                            </li>
                                            <li className = 'news-item' >
                                                <div className = 'df-ac-js'>
                                                    <div className = 'ellipsis news-list-title'>标题标题标题标题标题标题标题标题标题</div>
                                                    <div className = 'news-time'>2021.08.31</div>
                                                </div>
                                            </li>
                                            <li className = 'news-item' >
                                                <div className = 'df-ac-js'>
                                                    <div className = 'ellipsis news-list-title'>标题标题标题标题标题标题标题标题标题</div>
                                                    <div className = 'news-time'>2021.08.31</div>
                                                </div>
                                            </li>
                                            <li className = 'news-item' >
                                                <div className = 'df-ac-js'>
                                                    <div className = 'ellipsis news-list-title'>标题标题标题标题标题标题标题标题标题</div>
                                                    <div className = 'news-time'>2021.08.31</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className = 'nj-news-link'>
                                    <div className = 'news-link-title df-ac-js'> 
                                        <span>相关链接</span>
                                        <a className = 'more-btn' target = '_blank' 
                                            href = '#'
                                            rel = 'noopener norefferrer'
                                        >更多&gt;&gt;</a>
                                    </div>
                                    <div className = 'news-link-container'>
                                        <div className = 'arrow-btn left-arrow ' />
                                        <ul className = 'news-link-list'>
                                            <li className = 'link-content-item'>
                                                <a className = 'link-item'>
                                                    <img src = { link1 } />
                                                </a>
                                            </li>
                                            <li className = 'link-content-item'>
                                                <a className = 'link-item'>
                                                    <img src = { link1 } />
                                                </a>
                                            </li>
                                            <li className = 'link-content-item'>
                                                <a className = 'link-item'>
                                                    <img src = { link1 } />
                                                </a>
                                            </li>
                                            <li className = 'link-content-item'>
                                                <a className = 'link-item'>
                                                    <img src = { link1 } />
                                                </a>
                                            </li>
                                            <li className = 'link-content-item'>
                                                <a className = 'link-item'>
                                                    <img src = { link1 } />
                                                </a>
                                            </li>
                                            <li className = 'link-content-item'>
                                                <a className = 'link-item'>
                                                    <img src = { link1 } />
                                                </a>
                                            </li>
                                            <li className = 'link-content-item'>
                                                <a className = 'link-item'>
                                                    <img src = { link1 } />
                                                </a>
                                            </li>
                                            <li className = 'link-content-item'>
                                                <a className = 'link-item'>
                                                    <img src = { link1 } />
                                                </a>
                                            </li>
                                            <li className = 'link-content-item'>
                                                <a className = 'link-item'>
                                                    <img src = { link1 } />
                                                </a>
                                            </li>
                                        </ul>
                                        <div className = 'arrow-btn right-arrow'  />
                                    </div>
                                </div>
                            </div>
                            { /* 行业介绍 */ }
                            <div className = 'm-b-16 nj-industry'>
                                <div className = 'bg-fff nj-industry-card '>
                                    <h5 className = 'card-title'>四新一大</h5>
                                    <div className = 'df-ac-js industry-content'>
                                        <div className = 'industry-container m-r-8'>
                                            <img  src = { industry } className = 'industry-img' />
                                        </div>
                                        <div className = 'industry-container industry-2' />
                                        <div className = 'industry-container m-r-8 industry-3' />
                                        <div className = 'industry-container industry-4' />
                                        <div className = 'industry-container-1 industry-5' />
                                    </div>
                                    <div className = 'industry-hint'>
                                        <div className = 'industry-hint-content'>
                                            <div>
                                                <div className = 'company-item'>企业数：<span className = 'company-num'>1730</span>家</div>
                                                <div className = 'company-item'>知识产权拥有量：<span className = 'company-num'>1730</span>家</div>
                                            </div>
                                      
                                        </div>
                                    </div>
                                
                                </div>
                                <div className = 'bg-fff nj-industry-card'>
                                    <h5 className = 'card-title'>现代农业</h5>
                                    <div className = 'df-ac-js industry-content'>
                                        <div className = 'm-b-10 farming-container m-r-8 '>
                                            <div className = 'farming-container-content farming-1' />
                                        </div>
                                        <div className = 'm-b-10 farming-container '>
                                            <div className = 'farming-container-content farming-2' />
                                        </div>
                                        <div className = 'farming-container m-r-8 '>
                                            <div className = 'farming-container-content farming-3' />
                                        </div>
                                        <div className = 'farming-container '>
                                            <div className = 'farming-container-content farming-4' />
                                        </div>
                                    </div>
                                </div>
                                <div className = 'bg-fff nj-industry-card'>
                                    <h5 className = 'card-title'>现代服务业</h5>
                                    <div className = 'df-ac-js industry-content'>
                                        <div className = 'industry-container m-r-8 service-6' />
                                        <div className = 'industry-container service-7' />
                                        <div className = 'industry-container m-r-8 service-8' />
                                        <div className = 'industry-container service-9' />
                                        <div className = 'industry-container-1 service-10' />
                                    </div>
                                    <div className = 'industry-hint'>
                                        <div className = 'industry-hint-content'>
                                            <div>
                                                <div className = 'company-item'>企业数：<span className = 'company-num'>1730</span>家</div>
                                                <div className = 'company-item'>知识产权拥有量：<span className = 'company-num'>1730</span>家</div>
                                            </div>
                                      
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { /* 项目管家 */ }
                            <div className = 'bg-fff m-b-16 item-steward'>
                                <div className = 'item-steward-left'>
                                    <h5 className = 'item-steward-title'>项目管家</h5>
                                    <div className = 'item-steward-statistics'>
                                        <h6 className = 'sub-statistics'>已扶持金额</h6>
                                        <div><span className = 'statistics-money'>127,773</span>万元</div>
                                    </div>
                                    <div className = 'item-steward-statistics'>
                                        <h6 className = 'sub-statistics'>已扶持企业</h6>
                                        <div><span className = 'statistics-money'>127</span>家</div>
                                    </div>
                                    <div className = 'item-steward-statistics'>
                                        <h6 className = 'sub-statistics'>申报中企业</h6>
                                        <div><span className = 'statistics-money'>127</span>家</div>
                                    </div>
                                    <div className = 'statistics-foot'>
                                        <div className = 'btn-item m-b-10'>政策条款</div>
                                        <div className = 'btn-item m-b-10'>项目申报</div>
                                        <div className = 'btn-item' >资料下载</div>
                                        <div className = 'btn-item'>兑现公示</div>
                                    </div>
                                </div>
                                <div className = 'item-steward-center'>
                                    <div className = 'steward-content'>
                                        <h5 className = 'item-steward-title'>历年企业数（家）</h5>
                                        <div className = 'item-steward-chart item-steward-chart-1' />
                                    </div>
                                    <div className = 'steward-content'>
                                        <h5 className = 'item-steward-title'>历年历年申报金额（万元）</h5>
                                        <div className = 'item-steward-chart item-steward-chart-2' />
                                    </div>
                                </div>
                                <div className = 'item-steward-right'>
                                    <h5 className = 'df-ac-js item-steward-title'>
                                        <span>项目申报</span>
                                        <span className = 'all-text'>查看全部&gt;&gt;</span>
                                    </h5>
                                    <div className = 'steward-declar-table'>
                                        <div className = 'steward-declare-thead steward-declare-tr'>
                                            <div className = 'steward-declare-td declare-td-1'>政策</div>
                                            <div className = 'steward-declare-td declare-td-2'>发布时间</div>
                                            <div className = 'steward-declare-td declare-td-3'>操作</div>
                                        </div>
                                        <div className = 'steward-declare-tbody'>
                                            <div className = 'steward-declare-tr'>
                                                <div className = 'steward-declare-td declare-td-1 ellipsis'>标题标题标题标题标题标题标题标题标题</div>
                                                <div className = 'df-ac-js steward-declare-td declare-td-2'>
                                                    <div className = 'steward-declare-date'>2021.08.31</div>
                                                    <div>
                                                        <span className = 'time-icon' />
                                                        <span className = 'tiemt-text'>15</span>天
                                                    </div>
                                                </div>
                                                <div className = 'steward-declare-td declare-td-3 c-0057AD cursor-pointer'>进入申请</div>
                                            </div>
                                            <div className = 'steward-declare-tr'>
                                                <div className = 'steward-declare-td declare-td-1 ellipsis'>标题标题标题标题标题标题标题标题标题</div>
                                                <div className = 'df-ac-js steward-declare-td declare-td-2'>
                                                    <div className = 'steward-declare-date'>2021.08.31</div>
                                                    <div>
                                                        <span className = 'time-icon' />
                                                        <span className = 'tiemt-text'>15</span>天
                                                    </div>
                                                </div>
                                                <div className = 'steward-declare-td declare-td-3 c-0057AD cursor-pointer'>进入申请</div>
                                            </div>
                                            <div className = 'steward-declare-tr'>
                                                <div className = 'steward-declare-td declare-td-1 ellipsis'>标题标题标题标题标题标题标题标题标题</div>
                                                <div className = 'df-ac-js steward-declare-td declare-td-2'>
                                                    <div className = 'steward-declare-date'>2021.08.31</div>
                                                    <div>
                                                        <span className = 'time-icon' />
                                                        <span className = 'tiemt-text'>15</span>天
                                                    </div>
                                                </div>
                                                <div className = 'steward-declare-td declare-td-3 c-0057AD cursor-pointer'>进入申请</div>
                                            </div>
                                            <div className = 'steward-declare-tr'>
                                                <div className = 'steward-declare-td declare-td-1 ellipsis'>标题标题标题标题标题标题标题标题标题</div>
                                                <div className = 'df-ac-js steward-declare-td declare-td-2'>
                                                    <div className = 'steward-declare-date'>2021.08.31</div>
                                                    <div>
                                                        <span className = 'time-icon' />
                                                        <span className = 'tiemt-text'>15</span>天
                                                    </div>
                                                </div>
                                                <div className = 'steward-declare-td declare-td-3 c-0057AD cursor-pointer'>进入申请</div>
                                            </div>
                                            <div className = 'steward-declare-tr'>
                                                <div className = 'steward-declare-td declare-td-1 ellipsis'>标题标题标题标题标题标题标题标题标题</div>
                                                <div className = 'df-ac-js steward-declare-td declare-td-2'>
                                                    <div className = 'steward-declare-date'>2021.08.31</div>
                                                    <div>
                                                        <span className = 'time-icon' />
                                                        <span className = 'tiemt-text'>15</span>天
                                                    </div>
                                                </div>
                                                <div className = 'steward-declare-td declare-td-3 c-0057AD cursor-pointer'>进入申请</div>
                                            </div>
                                            <div className = 'steward-declare-tr'>
                                                <div className = 'steward-declare-td declare-td-1 ellipsis'>标题标题标题标题标题标题标题标题标题</div>
                                                <div className = 'df-ac-js steward-declare-td declare-td-2'>
                                                    <div className = 'steward-declare-date'>2021.08.31</div>
                                                    <div>
                                                        <span className = 'time-icon' />
                                                        <span className = 'tiemt-text'>15</span>天
                                                    </div>
                                                </div>
                                                <div className = 'steward-declare-td declare-td-3 c-0057AD cursor-pointer'>进入申请</div>
                                            </div>
                                            <div className = 'steward-declare-tr'>
                                                <div className = 'steward-declare-td declare-td-1 ellipsis'>标题标题标题标题标题标题标题标题标题</div>
                                                <div className = 'df-ac-js steward-declare-td declare-td-2'>
                                                    <div className = 'steward-declare-date'>2021.08.31</div>
                                                    <div>
                                                        <span className = 'time-icon' />
                                                        <span className = 'tiemt-text'>15</span>天
                                                    </div>
                                                </div>
                                                <div className = 'steward-declare-td declare-td-3 c-0057AD cursor-pointer'>进入申请</div>
                                            </div>
                                            <div className = 'steward-declare-tr'>
                                                <div className = 'steward-declare-td declare-td-1 ellipsis'>标题标题标题标题标题标题标题标题标题</div>
                                                <div className = 'df-ac-js steward-declare-td declare-td-2'>
                                                    <div className = 'steward-declare-date'>2021.08.31</div>
                                                    <div>
                                                        <span className = 'time-icon' />
                                                        <span className = 'tiemt-text'>15</span>天
                                                    </div>
                                                </div>
                                                <div className = 'steward-declare-td declare-td-3 c-0057AD cursor-pointer'>进入申请</div>
                                            </div>
                                            <div className = 'steward-declare-tr'>
                                                <div className = 'steward-declare-td declare-td-1 ellipsis'>标题标题标题标题标题标题标题标题标题</div>
                                                <div className = 'df-ac-js steward-declare-td declare-td-2'>
                                                    <div className = 'steward-declare-date'>2021.08.31</div>
                                                    <div>
                                                        <span className = 'time-icon' />
                                                        <span className = 'tiemt-text'>15</span>天
                                                    </div>
                                                </div>
                                                <div className = 'steward-declare-td declare-td-3 c-0057AD cursor-pointer'>进入申请</div>
                                            </div>
                                            <div className = 'steward-declare-tr'>
                                                <div className = 'steward-declare-td declare-td-1 ellipsis'>标题标题标题标题标题标题标题标题标题</div>
                                                <div className = 'df-ac-js steward-declare-td declare-td-2'>
                                                    <div className = 'steward-declare-date'>2021.08.31</div>
                                                    <div>
                                                        <span className = 'time-icon' />
                                                        <span className = 'tiemt-text'>15</span>天
                                                    </div>
                                                </div>
                                                <div className = 'steward-declare-td declare-td-3 c-0057AD cursor-pointer'>进入申请</div>
                                            </div>
                                        </div>
                                    </div>
                               
                                </div>
                            </div>
                        </div>
                    </div>
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