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

  state = {
    options: [],
  }

  initOptions = async (categorys) => {
    // 根据categorys生成options数组
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false, // 不是叶子
    }))

   /*  this.setState({
      options
    }) */

     // 如果是一个二级分类商品的更新
    const {isUpdate, product} = this
    const {pCategoryId} = product
    if(isUpdate && pCategoryId!=='0') {
      // 获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId)
      // 生成二级下拉列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))

      // 找到当前商品对应的一级option对象
      const targetOption = options.find(option => option.value===pCategoryId) 

      // 关联对应的一级option上
      targetOption.children = childOptions
    }


    // 更新options状态
    this.setState({
      options
    })
  }


  /*
  异步获取一级/二级分类列表, 并显示
  async函数的返回值是一个新的promise对象, promise的结果和值由async的结果来决定
   */
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)   // {status: 0, data: categorys}
    if (result.status===0) {
      const categorys = result.data
      // 如果是一级分类列表
      if (parentId==='0') {
        this.initOptions(categorys)
      } else { // 二级列表
        return categorys  // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
      }
    }
  }


   /*
  验证价格的自定义验证函数
   */
  validatePrice = (rule, value, callback) => {
    console.log(value, typeof value)
    if (value*1 > 0) {
      callback() // 验证通过
    } else {
      callback('价格必须大于0') // 验证没通过
    }
  }

  /*
  用加载下一级列表的回调函数
   */
  loadData = async selectedOptions => {
    // 得到选择的option对象
    const targetOption = selectedOptions[0]
    // 显示loading
    targetOption.loading = true

    // 根据选中的分类, 请求获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value)
    // 隐藏loading
    targetOption.loading = false
    // 二级分类数组有数据
    if (subCategorys && subCategorys.length>0) {
      // 生成一个二级列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 关联到当前option上
      targetOption.children = childOptions
    } else { // 当前选中的分类没有二级分类
      targetOption.isLeaf = true
    }

    // 更新options状态
    this.setState({
      options: [...this.state.options],
    })
  }



 // 创建ref
 addUpdateForm = React.createRef()
 pw = React.createRef() //接收图片的ref
 editor = React.createRef() //富文本的ref


 // 提交更新或者修改
 submit = async()=>{
   let values
   try{
     values = await this.addUpdateForm.current.validateFields()
     // 取出数据
   const {name,desc,price,categoryIds} = values
   
   let pCategoryId, categoryId
       if (categoryIds.length===1) {
         pCategoryId = '0'
         categoryId = categoryIds[0]
       } else {
         pCategoryId = categoryIds[0]
         categoryId = categoryIds[1]
       }
   const imgs = this.pw.current.getImgs()
   const detail = this.editor.current.getDetail()
   const product = {name, desc, price, imgs, detail, pCategoryId, categoryId}
   // 如果是更新, 需要添加_id
   if(this.isUpdate){
     product._id = this.products._id
   }
   // 2. 调用接口请求函数去添加/更新
   const result = (await reqAddOrUpdateProduct(product)).data
   // 3. 根据结果提示
   if (result.status===0) {
     message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
     this.props.navigate(-1)
   } else {
     message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
   }
   }
   catch({errorFields,values}){
     console.log(errorFields)
     if(errorFields.length>0){
       errorFields.map(err=>{
        return message.error(err.errors)
       })
     }
   }
   
   }
   // console.log(this.addUpdateForm.current)
   // console.log(this.addUpdateForm.current.getFieldsValue())
   // console.log(this.pw.current.getImgs(),this.editor.current.getDetail())



   componentDidMount () {
    this.getCategorys('0')
  }

  componentWillMount () {
    // 取出携带的state
    const product = this.props.location.state  // 如果是添加没值, 否则有值
    // 保存是否是更新的标识
    this.isUpdate = !!product
    // 保存商品(如果没有, 保存是{})
    this.product = product || {}
  }





  render() {
     // 指定Item布局的配置对象
     const formItemLayout = {
      labelCol: { span: 2 },  // 左侧label的宽度
      wrapperCol: { span: 8 }, // 右侧包裹的宽度
    }

    const {isUpdate, product} = this
    const {pCategoryId, categoryId, imgs, detail} = product

    // 用来接收级联分类ID的数组
    const categoryIds = []
    if(isUpdate) {
      // 商品是一个一级分类的商品
      if(pCategoryId==='0') {
        categoryIds.push(categoryId)
      } else {
        // 商品是一个二级分类的商品
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }

 
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
          initialValue={product.name}
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
          initialValue={product.desc}
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
          initialValue={product.price}
          rules={[
            {required: true, message: '必须输入商品价格'},
            {validator: this.validatePrice}
          ]}
          >
            <InputNumber addonAfter="元"/>
          </Form.Item>
          <Form.Item
          label='商品分类'
          name='categoryIds'
          initialValue={categoryIds}
          >
            <Cascader 
            options={this.state.options} 
            loadData={this.loadData}
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
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
