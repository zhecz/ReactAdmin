import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import {withRouter} from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../link-button'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'
import { reqWeatherQuery } from '../../api'
import storageUtils from '../../utils/storageUtils'


import './index.less'

const { confirm } = Modal;

class Header extends Component {


  state = {
    currentTime: formateDate(Date.now()), // 当前时间字符串
  }

  getTime = () => {
    // 每隔1s获取当前时间, 并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    }, 1000)
  }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key===path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        // 如果有值才说明有匹配的
        if(cItem) {
          // 取出它的title
          title = cItem.title
        }
      }
    })
    return title
  }



   /*
  退出登陆
   */
  logout = () => {
    // 显示确认框
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        console.log('OK', this)
        // 删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}

        // 跳转到login
        this.props.history.replace('/login')
      }
    })
  }

  componentDidMount () {
    // 获取当前的时间
    this.getTime()
    
  }

  
  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }
 
  render() {

    const {currentTime} = this.state

    const username = memoryUtils.user.username

    const title = this.getTitle()



    return (
      
      
      <div className="header">
      <div className="header-top">
        <span>Welcome, {username}</span>
        <LinkButton onClick={this.logout}>Logout</LinkButton>
       
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
        <span>{currentTime}</span>
          
        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(Header)
