<template>
  <div class="home-category" @mouseleave="currentId = null">
    <ul class="menu">
      <li
        :class="{ active: item.id && item.id === currentId }"
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="currentId = item.id"
      >
        <!-- 一级分类 -->
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <!-- 二级分类 -->
        <template v-if="item.children">
          <RouterLink
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
            >{{ sub.name }}</RouterLink
          >
        </template>
        <template v-else>
          <XtxSkeleton
            width="60px"
            height="18px"
            bg="rgba(255,255,255,.2)"
            style="margin:0 8px"
            animated
          />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,.2)" animated />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer" v-if="currentCategory">
      <h4>
        {{ currentCategory.id === 'brand' ? '品牌' : '分类' }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <!-- 分类推荐 -->
      <ul v-if="currentCategory.goods">
        <li v-for="item in currentCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>

      <!-- 品牌推荐 -->
      <ul v-if="currentCategory.brands">
        <li class="brand" v-for="item in currentCategory.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ item.place }}
              </p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/home'
import XtxSkeleton from '../../../components/lib/xtx-skeleton.vue'
export default {
  name: 'HomeCategory',
  setup () {
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children', name: '推荐品牌' }],
      brands: []
    })
    const store = useStore()
    // 依赖已有数据加工得到新的数据 用计算属性
    const menuList = computed(() => {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          goods: item.goods,
          children: item.children && item.children.slice(0, 2)
        }
      })
      list.push(brand)
      return list
    })
    // 得到弹层的推荐商品数据
    const currentId = ref(null)
    const currentCategory = computed(() => {
      return menuList.value.find(item => item.id === currentId.value)
    })
    //  获取品牌数据
    findBrand().then(res => {
      brand.brands = res.result
    })
    return { menuList, currentCategory, currentId }
  },
  components: { XtxSkeleton }
}
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    > li > a {
      &:hover {
        color: @helpColor;
      }
      ~ a {
        margin-left: 8px;
      }
    }
    li {
      padding-left: 25px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  // 弹层
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
