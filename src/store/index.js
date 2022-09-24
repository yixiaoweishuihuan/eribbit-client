import { createStore } from 'vuex'
// 模块的使用
const card = {
  // 不加name
  state: {
    name: 'moduleA'
  },
  getters: {
    newName (state) {
      return state.name + 666
    }
  }
}

const goods = {
  // 命名模块
  namespaced: true,
  state: {
    name: 'moduleB'
  },
  getters: {
    newName (state) {
      return state.name + 999
    }
  },
  mutations: {
    updateName (state, payload) {
      state.name = payload
    }
  },
  actions: {
    updateName ({ commit }, payload) {
      setTimeout(() => {
        commit('updateName', payload)
      }, 1000)
    }
  }
}

export default createStore({
  modules: {
    card,
    goods
  }
})

// export default createStore({
//   state: {
//     name: '张三'
//   },
//   getters: {
//     newName (state) {
//       return state.name + '666'
//     }
//   },
//   mutations: {
//     updateName (state, payload) {
//       state.name = payload
//     }
//   },
//   actions: {
//     updateName ({ commit }, payload) {
//       setTimeout(() => {
//         commit('updateName', payload)
//       }, 1000)
//     }
//   },
//   modules: {}
// })
