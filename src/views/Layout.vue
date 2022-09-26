<template>
  <!-- 顶部通栏 -->
  <AppNavbar />
  <!-- 头部布局 -->
  <AppHeader />
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
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style></style>
