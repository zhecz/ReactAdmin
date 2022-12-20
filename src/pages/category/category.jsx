import React, { Component } from 'react'
import { Card, Button, Table, Modal } from 'antd'
import LinkButton from '../../components/link-button';

export default class Category extends Component {
  render() {

    const title = '一级分类列表'
    const extra = (
      <Button type='primary'> 添加</Button>
    )

    const dataSource = [
      {
        "parentId": "0",
        "_id": "5e12b8bce31bb727e4b0e348",
        "name": "家用电器",
        "__v": 0
    },
    {
        "parentId": "0",
        "_id": "5e130ec7e31bb727e4b0e34c",
        "name": "洗衣机",
        "__v": 0
    },
    {
        "parentId": "0",
        "_id": "5e130e60e31bb727e4b0e34b",
        "name": "手机",
        "__v": 0
    },
    {
        "parentId": "0",
        "_id": "5e1346533ed02518b4db0cd7",
        "name": "图书",
        "__v": 0
    },
    ];
    
    const columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width:300,
        render: ()=>(
          <span>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </span>
        )
        
      },
     
    ];



    return (
      <Card title={title} extra={extra}>
      <Table
      dataSource={dataSource}
      columns={columns}
      rowKey='_id' // 设置key值,不然会报错
      bordered
      />
    </Card>
    )
  }
}
