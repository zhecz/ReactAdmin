import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {
    Form,
    Input,
    Button,
    message
  } from 'antd'

import './login.less'
import logo from '../../assets/images/logo.png'


export default class Login extends Component {

    render() {
        return (
            <div className='login'>
                <header className='login-header'>
                <img src={logo} alt="logo"/>
                <h1>React项目: 后台管理系统</h1>

                </header>
                <section className='login-content'>
                
                 <h2>用户登陆</h2>
                 <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

     

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
                </section>

            </div>
        )
    }
}