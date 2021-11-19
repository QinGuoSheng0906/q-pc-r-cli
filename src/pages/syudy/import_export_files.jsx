/* eslint-disable no-empty-function */
/**
 * 导入导出文件
 */

import React, { Component } from 'react';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as XLSX from 'xlsx';

 
import { Table, Upload, message,Button, Row, Col, Modal, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import './styles/import_export_files.less';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id'
       
    },
    {
        title: '名称',
        dataIndex: 'name'
      
    }
];

class ImportExportFiles extends Component {
    state = { 
        isVisible: false,
        fileData: [],
        fileList: [],
        // 导入的数据
        importData: []
    }
    // 弹窗显示
    modalShow = () => {
        this.setState({
            isVisible: true
        })
    }
    // 弹窗关闭
    modalHide = () => {
        this.setState({
            isVisible: false,
            fileData: {},
            fileList: []
        })
    }
    // 文件上传之前
    handleBeforeUpload = (file) => {
        return new Promise(() => {
            this.importFiles(file)
            message.success('上传成功');
            return false;
        });
        
    }
    // 删除文件
    handleRemove = () => {
        this.setState({
            importData: [],
            fileData: [],
            fileList: []
        });
    }
    // 文件导入 可读取多张sheet，二维数组返回
    importFiles = (file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = () => {
            const result = reader.result;
            // 以二进制流方式读取得到整份excel表格对象
            const workbook = XLSX.read(result, { type: 'binary' });
            let data = []; // 存储获取到的数据
            // 遍历每张工作表进行读取（这里默认只读取第一张表）
            for (const sheet in workbook.Sheets) {
                // if (workbook.Sheets.hasOwnProperty(sheet)) {
                // console.log('sheet', workbook.Sheets[sheet])
                if (Object.prototype.hasOwnProperty.call(workbook.Sheets, sheet)) {
                    let orgData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); 
                    // 利用 sheet_to_json 方法将 excel 转成 json 数据
                    if(orgData && orgData.length) {
                        data.push(orgData)
                    }
                    // data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                }
            }
            console.log('data', data)
            let keys = [ 'id', 'name' ];
            let exclData = [];
            // 提取数据
            data.forEach((items, index) => {
                exclData[index] = [];
                items.forEach(a => {
                    let itemValues = Object.values(a);
                    let obj = {};
                    itemValues.forEach((item, index) => {
                        keys[index] ? obj[keys[index]] = item : ''
                    })
                    exclData[index].push(obj)
                })
              
            })
            this.setState({
                fileList: [ file ],
                fileData: exclData
            })
            // 限制case条数
            console.log('exclData', exclData)
        }
    }
    // 导入文件确定
    importConfirm = () => {
        let { fileData } = this.state;
        this.setState({
            importData: fileData
        }, () => {
            this.modalHide();
        })
    }
    // 导出文件
    exportFiles = () => {
        this.exportFilesSheets();
        // this.exportFilesTwoArray();
        // this.exportFilesJSON();
    }
    // 二维数据组 数据导出处理
    exportFilesTwoArray = () => {
        //数据表格
        let table=[
            [ '姓名', '性别', '年龄', '注册时间' ],
            [ '张三', '男', 18, new Date() ],
            [ '李四', '女', 22, new Date() ]
        ];
        //创建book
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(table); // 处理二维数组 转sheet
        // 设置行高
        ws ['!rows '] = [
            { hpt: 100 }
        ]
        // 设置列宽
        ws['!cols'] = [
            { width: 15 },
            { width: 50 },
            { width: 15 },
            { width: 30 },
            { width: 10 }
        ];
        // // 设置单元格合并
        // ws['!merges'] = [
        //     {
        //         s:{ c: 0, r: 0 },
        //         e:{ c: 5, r: 0 }
        //     }
        // ]

        // 超链接
        // ws['A2'].l = { Target:'https://docs.sheetjs.com/#hyperlinks' };
        // ws['B2'].l = { Target:'https://sheetjs.com', Tooltip:'这是一个超链接' };
        
        let timestamp = (new Date()).getTime();
        //sheet写入book
        XLSX.utils.book_append_sheet(wb, ws, 'file');
        //输出
        XLSX.writeFile(wb,'file'+timestamp+'.xlsx');
    }
    // JSON 数据导出处理
    exportFilesJSON = () => {
        //json 数据
        let data = [ 
            {
                'a': 1,
                'x': 2,
                'b': 3,
                'y': 4,
                'success':true
            }, 
            {
                'a': 1,
                'x': 2,
                'b': 3,
                'y': 4,
                'success':false
            }
        ];
        //数据表格
        let table=[];
        table.push({
            A:'列A',
            B:'列B',
            C:'列C',
            D:'列D',
            E:'列E'
        });
        data.forEach(function (item) {
            let row={
                A:item.b,
                B:item.y,
                C:item.a,
                D:item.x,
                E:(item.success?'成功':'失败')
            };
            table.push(row);
        });
        //创建book
        let wb = XLSX.utils.book_new();
        //json转sheet
        let ws = XLSX.utils.json_to_sheet(table, { header:[ 'A','B','C','D','E' ], skipHeader:true });
        // 设置行高
        ws ['!rows '] = [
            { hpt: 100 }
        ]
        // 设置列宽
        ws['!cols'] = [
            { width: 15 },
            { width: 50 },
            { width: 15 },
            { width: 30 },
            { width: 10 }
        ];
        // // 设置单元格合并
        // ws['!merges'] = [
        //     {
        //         s:{ c: 0, r: 0 },
        //         e:{ c: 5, r: 0 }
        //     }
        // ]

        // 超链接
        // ws['A2'].l = { Target:'https://docs.sheetjs.com/#hyperlinks' };
        // ws['B2'].l = { Target:'https://sheetjs.com', Tooltip:'这是一个超链接' };

        let timestamp = (new Date()).getTime();
        //sheet写入book
        XLSX.utils.book_append_sheet(wb, ws, 'file');
        //输出
        XLSX.writeFile(wb,'file'+timestamp+'.xlsx');
    }
    // 多个sheet 导出
    exportFilesSheets = () => {
        let data1 = [
            [ '姓名', '性别', '年龄' ],
            [ '王麻子', '男', '30' ],
            [ '李二娃', '男', '25' ]
        ];
        let data2 = [
            [ '姓名', '性别', '年龄' ],
            [ '王春花', '女', '22' ],
            [ '李翠兰', '女', '32' ]
        ];
        //创建book
        let wb = XLSX.utils.book_new();
        let sheet1 = XLSX.utils.aoa_to_sheet(data1); // 处理二维数组 转sheet
        let sheet2 = XLSX.utils.aoa_to_sheet(data2); // 处理二维数组 转sheet
        // 设置表二列宽
        sheet2['!cols'] = [
            { width: 15 },
            { width: 50 },
            { width: 15 }
        ]
        //sheet写入book
        XLSX.utils.book_append_sheet(wb,sheet1, '表一');
        XLSX.utils.book_append_sheet(wb,sheet2, '表二');
        //输出
        let timestamp = (new Date()).getTime();
        XLSX.writeFile(wb,'file'+timestamp+'.xlsx');
    }
    render () {
        let { isVisible, importData, fileList } = this.state;
        return(
            <div className = 'import-export-files'>
                <Row className = 'm-20'>
                    <Col span = { 6 } offset = { 6 } >
                        <Button type = 'primary' onClick = { this.modalShow }>导入</Button>
                    </Col>
                    <Col span = { 6 }>
                        <Button type = 'primary' onClick = { this.exportFiles }>导出</Button>
                    </Col>
                </Row>
                <div style = { { width: '1200px', margin: '20px auto' } }>
                    <Card title = '表格一'>
                        <Table 
                            bordered
                            dataSource = { importData[0] || []  } 
                            columns = { columns }
                            rowKey = { (recod) => recod.id }
                        />
                    </Card>
                </div>
                <div style = { { width: '1200px', margin: '0 auto' } }>
                    <Card title = '表格二'>
                        <Table 
                            bordered
                            dataSource = { importData[1] || []  } 
                            columns = { columns }
                            rowKey = { (recod) => recod.id }
                        />
                    </Card>
                </div>
                <Modal
                    title = '导入文件'
                    visible = { isVisible } 
                    onOk = { this.importConfirm } 
                    onCancel = { this.modalHide }
                    wrapClassName = 'import-files-modal'
                >
                    <Upload
                        listType = 'picture-card'
                        fileList = { fileList }
                        beforeUpload = { this.handleBeforeUpload } 
                        onRemove = { this.handleRemove }
                        accept = '.xlsx,.xls'
                    >
                      
                        <div className = 't-c import-files-text'>
                            <PlusOutlined />
                            <div>上传文件</div>
                        </div>
                    </Upload> 
                </Modal>
            </div>
        )
      
    }
}

function propMap (state) {
    return {
        spinInfo: state.spinInfo
    };
}
 
ImportExportFiles.propTypes = {
    dispatch: PropTypes.func
};
export default connect(propMap)(ImportExportFiles) ;