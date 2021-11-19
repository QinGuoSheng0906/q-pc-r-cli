/**
 *  公共页面标题
 *  2021/08/26
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Row, Col } from 'antd';

class PageTitle extends Component {
    render () {      
        const { title, subTitle, titleClass, center, right } = this.props;
        return (
            <div className = 'page-title-container'>
                <Row className = { titleClass ? `${titleClass} title` : 'title' }>
                    <Col span = { center ? 8 : 12 }>
                        <div className = 'page-title'>{ title }</div>
                        {
                            subTitle ? 
                                <div className = 'page-sub-title'>{ subTitle }</div> 
                                :
                                null
                        }
                        
                    </Col>
                    {
                        center ? 
                            <Col span = { 8 } className = 'page-title-center'>
                                <div>{ title }</div>
                            </Col>
                            : 
                            null
                    }
                    {
                        right ?
                            <Col span = { center ? 8 : 12 } className = 'page-title-right'>
                                { right }
                            </Col>
                            : null
                    }
                </Row>
                <Divider />
            </div>
        );
    }
}

PageTitle.propTypes = {
    title: PropTypes.any,
    subTitle: PropTypes.any,
    titleClass: PropTypes.string,
    center: PropTypes.any,
    right: PropTypes.any
};

export default PageTitle;