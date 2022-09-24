<template>
  <div class="App">
    根组件
    <p>state：{{ $store.state.name }}</p>
    <p>getters：{{ $store.getters.newName }}</p>
    <button @click="updateName">mutatios</button> <button @click="acUpdateName">actions</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()
    // state
    console.log('state: ', store.state.name)
    // getters
    console.log('getters:', store.getters.newName)
    // mutatios
    const updateName = () => {
      store.commit('updateName', 'mutatios')
    }
    // actios
    const acUpdateName = () => {
      store.dispatch('updateName', 'actios')
    }
    return { updateName, acUpdateName }
  }
}
</script>
