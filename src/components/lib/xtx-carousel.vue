<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <!-- 轮播图图片 -->
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ fade: index === i }"
      >
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:;" class="carousel-btn prev" @click="toogle(-1)"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 下一张 -->
    <a href="javascript:;" class="carousel-btn next" @click="toogle(1)"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <span
        @click="index = i"
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ active: index === i }"
      ></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 自动轮播的时间间隔
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // 默认显示的图片的索引
    const index = ref(0)

    // 自动轮播图的逻辑
    let timer = null

    // 自动轮播
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }

    watch(
      () => props.sliders,
      newValue => {
        // 有数据&开启自动播放，才调用自动播放函数
        if (newValue.length && props.autoPlay) {
          index.value = 0
          autoPlayFn()
        }
      },
      { immediate: true }
    )

    // 鼠标进入停止，移出开启自动，前提条件：autoPlay为true

    // 鼠标移入 暂停播放
    const stop = () => {
      if (timer) clearInterval(timer)
    }

    // 鼠标移出 开始播放
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }

    // 上一张 下一张图片
    const toogle = step => {
      const newIndex = index.value + step
      if (newIndex >= props.sliders.length) {
        index.value = 0
        return
      }
      if (newIndex < 0) {
        index.value = props.sliders.length - 1
        return
      }
      index.value = newIndex
    }

    // 组件销毁 清除计时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { index, start, stop, toogle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
