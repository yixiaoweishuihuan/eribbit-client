// 用户信息模块
export default {
  namespaced: true,
  state () {
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
    // 修改用户信息
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
