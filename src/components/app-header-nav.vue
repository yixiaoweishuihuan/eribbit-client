<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li
      v-for="item in list"
      :key="item.id"
      @mouseenter="open(item)"
      @mouseleave="hidden(item)"
    >
      <routerLink :to="`/category/${item.id}`" @click="hidden(item)">{{
        item.name
      }}</routerLink>
      <div class="layer" :class="{ show: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <routerLink :to="`/category/sub/${item.id}`" @click="hidden(item)">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </routerLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'appHeaderNav',
  setup () {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })
    const open = ({ id }) => {
      store.commit('category/open', id)
    }
    const hidden = ({ id }) => {
      store.commit('category/hidden', id)
    }
    return { list, open, hidden }
  }
}
</script>

<style lang="less" scoped>
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 999;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  &.show {
    height: 132px;
    opacity: 1;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
