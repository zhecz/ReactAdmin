import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import LinkButton from '../../components/link-button'

  const Option = Select.Option
  

export default class ProductHome extends Component {

    state = {
        total: 0, // 商品的总数量
        products: [ {
            "status": 2,
            "imgs": [
                "1578588737108-index.jpg"
            ],
            "_id": "5e12b97de31bb727e4b0e349",
            "name": "联想ThinkPad 翼4809",
            "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
            "price": 6300,
            "pCategoryId": "5e12b8bce31bb727e4b0e348",
            "categoryId": "5fc74b650dd9b10798413162",
            "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\"></span></p>\n",
            "__v": 0
        },
        {
            "status": 1,
            "imgs": [
                "image-1559402448049.jpg",
                "image-1559402450480.jpg"
            ],
            "_id": "5e12b9d1e31bb727e4b0e34a",
            "name": "华硕(ASUS) 飞行堡垒",
            "desc": "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
            "price": 6799,
            "pCategoryId": "5e12b8bce31bb727e4b0e348",
            "categoryId": "5fc74b650dd9b10798413162",
            "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span> </p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span> </p>\n",
            "__v": 0
        }], // 商品的数组
       /*  loading: false, // 是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'productName', // 根据哪个字段搜索 */
      }

     /*
  初始化table的列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '$' + price  // 当前指定了对应的属性, 传入的是对应的属性值
      },
      {
        width: 100,
        title: '状态',
        // dataIndex: 'status',
        render: (product) => {
          const {status, _id} = product
          const newStatus = status===1 ? 2 : 1
          return (
            <span>
              <Button
                type='primary'
                onClick={() => this.updateStatus(_id, newStatus)}
              >
                {status===1 ? '下架' : '上架'}
              </Button>
              <span>{status===1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }





  componentWillMount () {
    this.initColumns()
  }











  render() {

    const {products} = this.state

    const title = (
        <span>
          <Select
          /*   value= {searchType} */
            style={{width: 150}}
           /*  onChange={value => this.setState({searchType:value})} */
          >
            <Option value='productName'>按名称搜索</Option>
            <Option value='productDesc'>按描述搜索</Option>
          </Select>
          <Input
            placeholder='关键字'
            style={{width: 150, margin: '0 15px'}}
           /*  value={searchName} */
           /*  onChange={event => this.setState({searchName:event.target.value})} */
          />
          <Button type='primary' /* onClick={() => this.getProducts(1)} */>搜索</Button>
        </span>
      )
  
      const extra = (
        <Button type='primary' /* onClick={() => this.props.history.push('/product/addupdate')} */>
         <PlusOutlined />
          添加商品
        </Button>
      )





    return (
        <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          //loading={loading}
          dataSource={products}
          columns={this.columns}
         /*  pagination={{
            current: this.pageNum,
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }} */
        />
      </Card>
    )
  }
}
