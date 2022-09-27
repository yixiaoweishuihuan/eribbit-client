<template>
  <!-- 顶部通栏 -->
  <AppNavbar />
  <!-- 头部布局 -->
  <AppHeader />
  <!-- 吸顶头部 -->
  <AppHeaderStick />
  <!-- 主内容区域 -->
  <div class="main">
    <routerView />
  </div>
  <!-- 底部栏 -->
  <AppFooter />
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderStick from '@/components/app-header-stick.vue'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter,
    AppHeaderStick
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style></style>
