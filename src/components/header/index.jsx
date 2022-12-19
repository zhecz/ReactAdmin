import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
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

  componentDidMount () {
    // 获取当前的时间
    this.getTime()
    
  }
 
  render() {

    const {currentTime} = this.state

    const username = memoryUtils.user.username



    return (
      
      
      <div className="header">
      <div className="header-top">
        <span>欢迎, {username}</span>
        <a href='javascript:'>退出</a>
       
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">首页</div>
        <div className="header-bottom-right">
        <span>{currentTime}</span>
          
        </div>
      </div>
    </div>
    )
  }
}

export default Header
