import React, { Component } from 'react'
import {Form,Input} from 'antd'
export default class UpdateForm extends Component {
  myForm = React.createRef()
 


  componentWillMount () {
    // 将form对象通过setForm()传递父组件
    this.props.setForm(this.myForm)
  }



  render() {
    const {category_name} = this.props
    return (
        <Form
        ref={this.myForm}
        initialValues={{categoryName:category_name}}
        >
        <Form.Item
        name='categoryName'
        rules={[
          {
            required: true,
            message: '分类名必须输入',
          },
        ]}>
            <Input  
            placeholder="请输入分类名"/>
        </Form.Item>
    </Form>
    )
  }
}


