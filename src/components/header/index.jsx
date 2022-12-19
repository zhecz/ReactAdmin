import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { formateDate } from '../../utils/dateUtils'
import { reqWeatherQuery } from '../../api'
import storageUtils from '../../utils/storageUtils'


import './index.less'

const { confirm } = Modal;

class Header extends Component {
 
  render() {
    return (
      
      
      <div className="header">
      <div className="header-top">
        <span>欢迎, admin</span>
        <a href='javascript:'>退出</a>
       
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left"></div>
        <div className="header-bottom-right">
          
        </div>
      </div>
    </div>
    )
  }
}

export default Header
