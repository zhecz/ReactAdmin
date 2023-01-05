import React, { Component } from 'react'
import './index.less'
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig';
import wrapIcon from '../../utils/wrapIcon';
//import withRouter from '../../utils/withRouter';
import storageUtils from '../../utils/storageUtils'
const { SubMenu } = Menu;

class LeftNav extends Component {


    getMenuNodes_map = (menuList) => {

        const path = this.props.location.pathname

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

             // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            this.openKey = item.key
          }

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


      getMenuNodes = (menuList)=>{
        return menuList.reduce((prev, item)=>{
            if(!item.children){
                prev.push(( <Menu.Item key={item.key}>
                    <Link to={item.key}>
                      <span>{item.title}</span>
                    </Link>
                  </Menu.Item>)
                   
                )
            }else {
                prev.push((
                    <SubMenu key={item.key} 
                    title={
                      <span>
                      <span>{item.title}</span>
                    </span>
                    }
                  >
                    {this.getMenuNodes(item.children)}
                  </SubMenu>
                ))
            }
            return prev
        }, [])
      }


      /*
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
   */
  componentWillMount () {
    this.menuNodes = this.getMenuNodes_map(menuList)
  }



  
    
  
    render() {

        // 得到当前请求的路由路径
        let path = this.props.location.pathname
        console.log('render()', path)
        if(path.indexOf('/product')===0) { // 当前请求的是商品或其子路由界面
          path = '/product'
    }

         // 得到需要打开菜单项的key
        const openKey = this.openKey
       
        return (
            <div className='left-nav'>
                <Link to="/" className='left-nav-header'>
                    <img src={logo} alt="" />
                    <h1>Management System</h1>
                </Link>
               
                   <Menu mode ="inline" 
                   theme="dark"
                   selectedKeys={[path]}
                   defaultOpenKeys={[openKey]}
                   >
                
                    {this.getMenuNodes_map(menuList)}

                   </Menu> 

        
            
                </div>

        )
    }
}
export default withRouter(LeftNav)
