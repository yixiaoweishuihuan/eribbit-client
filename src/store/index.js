import { createStore } from 'vuex'
import createPresistedstate from 'vuex-persistedstate'
import cart from './cart'
import user from './user'
import category from './category'

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
