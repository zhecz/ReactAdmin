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



  
    
  
    render() {
       
        return (
            <div className='left-nav'>
                <Link to="/" className='left-nav-header'>
                    <img src={logo} alt="" />
                    <h1>烧烤摊</h1>
                </Link>
               
                   <Menu mode ="inline" theme="dark">
                
                    {this.getMenuNodes(menuList)}

                   </Menu> 

        
            
                </div>

        )
    }
}
export default LeftNav
