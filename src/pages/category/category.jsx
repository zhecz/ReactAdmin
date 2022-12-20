import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button';
import {reqCategorys, reqUpdateCategory, reqAddCategory} from '../../api'

import AddForm from './add-form'
import UpdateForm from './update-form'

export default class Category extends Component {

  state = {
    loading: false, // 是否正在获取数据中
    categorys: [], // 一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: '0', // 当前需要显示的分类列表的父分类ID
    parentName: '', // 当前需要显示的分类列表的父分类名称
    showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新 
  }

 /*
  初始化Table所有列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name', // 显示数据对应的属性名
      },
      {
        title: '操作',
        width: 300,
        render: (category) => ( // 返回需要显示的界面标签
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
           
            {this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}


          </span>
        )
      }
    ]
  }

  /*
  异步获取一级/二级分类列表显示
  parentId: 如果没有指定根据状态中的parentId请求, 如果指定了根据指定的请求
   */
  getCategorys = async () => {

    // 在发请求前, 显示loading
    this.setState({loading: true})
    //parentId = parentId || this.state.parentId
    const {parentId} = this.state
    
    // 发异步ajax请求, 获取数据
    const result = await reqCategorys(parentId)
    // 在请求完成后, 隐藏loading
    this.setState({loading: false})

    if(result.status===0) {
      // 取出分类数组(可能是一级也可能二级的)
      const categorys = result.data
      if(parentId==='0') {
        this.setState({
          categorys
        })
        console.log('----', this.state.categorys.length)

      }else {
        this.setState({
          subCategorys:categorys
        })
      }     
    } else {
      message.error('获取分类列表失败')
    }
  }


  showSubCategorys = (category)=>{
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
      console.log('parentId', this.state.parentId)
      this.getCategorys()
    })
  }

  showCategorys = ()=>{
    this.setState(
      {
        parentId:'0',
        parentName: '',
        subCategorys: []
      }
    )
  }


  addCategory = ()=>{
    this.setState({
      showStatus: 0
    })
  }

  updateCategory = async ()=>{
     // 准备数据
     const categoryName = this.form.current.getFieldValue('categoryName')
     console.log(this.category._id,categoryName)
      // 准备数据
      const categoryId = this.category._id
       // 清除输入数据
       this.form.current.resetFields()

       // 2. 发请求更新分类
       const result = await reqUpdateCategory({categoryId, categoryName})
       if (result.status===0) {
         // 3. 重新显示列表
         this.getCategorys()
       }
     else{
       console.log(result.msg)
     }
  }

  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }


  /*
  显示添加的确认框
   */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  /*
  显示修改的确认框
   */
  showUpdate = (category) => {
    // 保存分类对象
    this.category = category
    // 更新状态
    this.setState({
      showStatus: 2
    })
  }



  /*
  为第一次render()准备数据
   */
  componentWillMount () {
    this.initColumns()
  }

  /*
  执行异步任务: 发异步ajax请求
   */
  componentDidMount () {
    // 获取一级分类列表显示
    this.getCategorys()
  }





  render() {

    // 读取状态数据
    const {categorys, subCategorys, parentId, parentName, loading, showStatus} = this.state

    // 读取指定的分类
    const category = this.category || {} // 如果还没有指定一个空对象

    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <Button type='link' onClick={this.showCategorys}>一级分类列表</Button>
        <ArrowRightOutlined />&nbsp;
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={this.showAdd}> 添加</Button>
    )

    



    return (
      <Card title={title} extra={extra}>
      <Table
       loading={loading}
       dataSource={parentId==='0' ? categorys : subCategorys}
       columns={this.columns}
       pagination={{defaultPageSize: 5, showQuickJumper: true}}
     
       rowKey='_id' // 设置key值,不然会报错
       bordered
      />
        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm/>
         {/*  <AddForm
            categorys={categorys}
            parentId={parentId}
            setForm={(form) => {this.form = form}}
          /> */}
        </Modal>

        <Modal
          title="更新分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >

          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {this.form = form}}
          />
        </Modal>
    </Card>
    )
  }
}
