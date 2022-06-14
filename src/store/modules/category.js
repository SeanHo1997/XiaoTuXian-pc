// 分类模块

// 存储的分类数据
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state () {
    return {
      // 预先定义一个有数据成员的数组，可以防止在没加载完成的情况下直接显示分类数据
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 加载数据成功后需要修改list，所以需要mutations
  mutations: {
    setList (state, headCategory) {
      state.list = headCategory
    },
    // 定义show/hide函数，控制二级分类显示和隐藏
    show (state, id) {
      const i = state.list.findIndex(item => item.id === id)
      state.list[i].open = true
    },
    hide (state, id) {
      const i = state.list.findIndex(item => item.id === id)
      state.list[i].open = false
    }
  },
  actions: {
    async getList (context) {
      const { result } = await findAllCategory()
      // 获取数据成功之后，提交给mutations进行数据修改
      // 给一级分类加上一个数据open,控制二级分类显示、隐藏
      result.forEach(item => {
        item.open = false
      })
      context.commit('setList', result)
    }
  }
}
