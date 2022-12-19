import React, { Component } from 'react'
import './index.less'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig';
import wrapIcon from '../../utils/wrapIcon';
//import withRouter from '../../utils/withRouter';
import storageUtils from '../../utils/storageUtils'
const { SubMenu } = Menu;

class LeftNav extends Component {


    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
         
          if(!item.children) {
            return (
              <Menu.Item key={item.key}>
                <Link to={item.key}>
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            )
          } else {
            return (
              <SubMenu key={item.key} 
                title={
                  <span>
                  <span>{item.title}</span>
                </span>
                }
              >
                {this.getMenuNodes_map(item.children)}
              </SubMenu>
            )
          }
    
        })
      }



  
    
  
    render() {
       
        return (
            <div className='left-nav'>
                <Link to="/" className='left-nav-header'>
                    <img src={logo} alt="" />
                    <h1>烧烤摊</h1>
                </Link>
               
                   <Menu mode ="inline" theme="dark">
                 {/*    <Menu.Item key="/home">
                        <Link to='/home'>
                        <span>首页</span>
                        </Link>
                       
                    </Menu.Item>

                    <SubMenu key="sub1" title={
                        <span>
                            <span>商品</span>
                        </span>
                    }>
                         <Menu.Item key="/category">
                            <Link to='/category'>
                            <span>品类管理</span>
                            </Link>                        
                        
                    </Menu.Item>
                    <Menu.Item key="/product">
                        <Link to='/product'>
                        <span>商品管理</span>
                        </Link>
                       
                    </Menu.Item>

                    </SubMenu>

                    <Menu.Item key="/user">
                        <Link to='/user'>
                        <span>用户管理</span>
                        </Link>
                       
                    </Menu.Item>

                    <Menu.Item key="/role">
                        <Link to='/role'>
                        <span>角色管理</span>
                        </Link>
                       
                    </Menu.Item> */}


                    {this.getMenuNodes_map(menuList)}

                   </Menu> 

        
            
                </div>

        )
    }
}
export default LeftNav
