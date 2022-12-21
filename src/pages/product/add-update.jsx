import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  InputNumber,
  Cascader,
  Button,
  message
} from 'antd'

//import PicturesWall from './pictures-wall'
//import RichTextEditor from './rich-text-editor'
import LinkButton from '../../components/link-button'
import {reqCategorys, reqAddOrUpdateProduct} from '../../api'

const {Item} = Form
const { TextArea } = Input

export default class ProductAddUpdate extends Component {

  render() {
     // 指定Item布局的配置对象
     const formItemLayout = {
      labelCol: { span: 2 },  // 左侧label的宽度
      wrapperCol: { span: 8 }, // 右侧包裹的宽度
    }

   /*  // 获取商品数据
    const {name,desc,price,pCategoryId,categoryId,imgs,detail} = this.products
    // 用来接收级联分类ID的数组
    const categoryIds = []
    if(pCategoryId==='0'){
      categoryIds.push(categoryId)
    }else{
      categoryIds.push(pCategoryId)
      categoryIds.push(categoryId)
    } */

    return (
      <Card
      title={this.title}>
        <Form
        {...formItemLayout}
        ref={this.addUpdateForm}
        >
          <Form.Item
          label='商品名称'
          name='name'
         /*  initialValue={name} */
          rules={[
            {
              required: true, message: '必须输入商品名称'
            }
          ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
          label='商品描述'
          name='desc'
         /*  initialValue={desc} */
          rules={[
            {
              required: true, message: '必须输入商品描述'
            }
          ]}
          >
            <Input.TextArea 
            placeholder='请输入商品描述' 
            autoSize={{minRows: 2, maxRows: 6}}
            />
          </Form.Item>
          <Form.Item
          label='商品价格'
          name='price'
         /*  initialValue={price} */
          rules={[
            {
              required: true, message: '必须输入商品价格'
            }
          ]}
          >
            <InputNumber addonAfter="元"/>
          </Form.Item>
          <Form.Item
          label='商品分类'
         /*  name='categoryIds' */
          /* initialValue={categoryIds} */
          >
            <Cascader 
            //options={this.state.options} 
           // loadData={this.loadData}
            placeholder='请指定商品分类'
            rules={[
              {
                required: true, message: '必须指定商品分类'
              }
            ]}
            ></Cascader>
          </Form.Item>
          <Form.Item label='商品图片'>
           {/*  <PictureWalls imgs={imgs} ref={this.pw}/> */}
          </Form.Item>
          <Form.Item label="商品详情">
         {/*  <RichTextEditor detail={detail} ref={this.editor}/> */}
          </Form.Item>
          <Form.Item>
            <Button type='primary'/*  onClick={this.submit} */>提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
