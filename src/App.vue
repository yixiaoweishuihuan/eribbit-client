<template>
  <div class="App">
    <h1>根组件</h1>
    <p>
      {{ $store.state.user.profile.account }}
      <button @click="$store.commit('user/setUser', '张三')">
        设置用户信息
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'App',
  setup () {}
}
</script>
