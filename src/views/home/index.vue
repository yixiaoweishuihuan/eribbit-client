<template>
  <div class="container">
    <button style="margin-right:10px" @click="login">登录</button>
    <button @click="logOut">退出</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'Home',
  setup () {
    const store = useStore()
    const login = () => {
      store.commit('user/setUser', {
        id: '666',
        avator: 'http://xxx.png',
        nickname: 'zhongyingdong',
        account: '钟鹰东',
        mobile: '17770064059',
        token: 'token666'
      })
    }
    const logOut = () => {
      store.commit('user/setUser', {})
    }
    return {
      login,
      logOut
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  @height: 500px;
  height: @height;
  line-height: @height;
  text-align: center;
}
</style>
