import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from '@/store/modules/user.js'
import cart from '@/store/modules/cart.js'
import category from '@/store/modules/category.js'

export default createStore({
  modules: {
    user,
    cart,
    category
  },
  // vuexpersistedstate下载后需要配置
  plugins: [createPersistedState({
    // 指定localStorage本地存储的key以及 需要自动存储的模块
    key: 'erabbit-client-pc-124-store',
    paths: ['user', 'cart']
  })]
})
