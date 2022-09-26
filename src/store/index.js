import { createStore } from 'vuex'
import createPresistedstate from 'vuex-persistedstate'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
  modules: {
    cart,
    user,
    category
  },
  plugins: [
    createPresistedstate({
      key: 'erabbit-client',
      paths: ['user', 'category'],
      storage: window.localStorage
    })
  ]
})
