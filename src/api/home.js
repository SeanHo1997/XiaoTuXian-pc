// 引入API函数
import { request } from '@/utils/request'
/*
* @params {Integer} limit - 品牌个数
* @return Promise
*
*/
export const findBrand = (limit) => {
  return request('/home/brand', 'GET', { limit: 6 })
}

// 获取轮播图图片
export const findBanner = distributionSide => {
  return request('/home/banner', 'GET', { distributionSide: 1 })
}

// 首页-新鲜好物
export const freshGoodGoods = () => {
  return request('/home/new', 'GET')
}

// 首页-热情推荐
export const hotRecommend = () => {
  return request('/home/hot', 'GET')
}

// 首页-人气推荐
export const hotBrands = () => {
  return request('/home/brand', 'GET')
}

// 首页-产品板块
export const productGoods = () => {
  return request('/home/goods', 'GET')
}

// 首页-最新专题
export const newestTheme = () => {
  return request('/home/special', 'GET')
}
