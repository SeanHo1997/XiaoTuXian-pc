// 引入请求函数
import { request, request2 } from '@/utils/request.js'

// 定义获取 头部分类 的 接口函数
export const findAllCategory = () => {
  return request('/home/category/head', 'GET')
}

// 一级类目
export const findTopcategory = id => {
  return request('/category', 'GET', { id })
}

// 二级类目筛选条件
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

// 商品列表-临时
export const goodsList = data => {
  return request('/category/goods/mutli', 'post', data)
}
export const goodsList2 = data => {
  return request2('/mock/1175/category/goods', 'post', data)
}
