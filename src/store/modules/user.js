// 用户模块
export default {
  namespaced: true,
  state () {
    // 用户信息
    return {
      profile: {
        id: '',
        avator: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
