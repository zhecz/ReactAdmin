import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {
    Form,
    Input,
    Button,
    message
  } from 'antd'

import './login.less'
import {reqLogin} from '../../api'
import logo from '../../assets/images/logo.png'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'


export default class Login extends Component {

    onFinish = async (values) => {
         // console.log('提交登陆的ajax请求', values)
        // 请求登陆
        const {username, password} = values
        const result = await reqLogin(username, password) // {status: 0, data: user}  {status: 1, msg: 'xxx'}
        // console.log('请求成功', result)
        if (result.status===0) { // 登陆成功
          // 提示登陆成功
          message.success('登陆成功')

          // 保存user
          const user = result.data
          memoryUtils.user = user // 保存在内存中
          storageUtils.saveUser(user) // 保存到local中

          // 跳转到管理界面 (不需要再回退回到登陆)
          this.props.history.replace('/')
        }
        else {
            message.error(result.msg)
        }
    }

   


    

    render() {
        
        // 如果用户已经登陆, 自动跳转到管理界面
    const user = memoryUtils.user
    if(user && user._id) {
      return <Redirect to='/'/>
    }
        return (
            <div className='login'>
                <header className='login-header'>
                <img src={logo} alt="logo"/>
                <h1>React项目: 后台管理系统</h1>
                </header>
                <section className='login-content'>                
                 <h2>用户登陆</h2>
                 <Form ref={this.formRef} onFinish={this.onFinish}
                       name="basic"
                       labelCol={{
                       span: 8,
                      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
     
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {required: true, message: 'Please input your username!',},
          { min: 4, message: '用户名至少4位' },
          { max: 12, message: '用户名最多12位' },
          { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>   
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
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