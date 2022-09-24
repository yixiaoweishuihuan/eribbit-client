<template>
  <div class="App">
    根组件
    <h1>card模块</h1>
    <p>state：{{ $store.state.card.name }}</p>
    <!-- 非命名模块 除了state是分模块的 其他的都是放在根模块上 -->
    <p>getters：{{ $store.getters.newName }}</p>
    <h1>goods模块</h1>
    <p>state：{{ $store.state.goods.name }}</p>
    <p>getters：{{ $store.getters['goods/newName'] }}</p>
    <button @click="nuUpdateName">mutatios</button> <button @click="acUpdateName">actios</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()
    const nuUpdateName = () => {
      store.commit('goods/updateName', 'goods mutations')
    }
    const acUpdateName = () => {
      store.dispatch('goods/updateName', 'goods actios')
    }
    return { nuUpdateName, acUpdateName }
  }
}
</script>
