<template>
  <div class='home-category'>
    <!-- 左侧分类栏 -->
    <ul class="menu">
      <li v-for="item in homeList" :key="item.id" @mouseenter="categoryID=item.id">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink
          v-for="subItem in item.children"
          :key="subItem.id"
          :to="`/category/sub/${subItem.id}`"
          >{{ subItem.name }}
          </RouterLink>
        </template>
        <!-- 导入骨架组件 -->
        <span v-else>
          <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </span>
      </li>
    </ul>
    <!-- /左侧分类栏 -->
    <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul v-if="currentCategory && currentCategory.goods">
        <li v-for="item in currentCategory.goods" :key="item.id" >
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌弹层 -->
      <ul v-if="currentCategory && currentCategory.brands">
        <li class="brand" v-for="item in currentCategory.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.name }}</p>
              <p class="name ellipsis">{{ item.desc }}</p>
              <p class="desc ellipsis-2">{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- /品牌弹层 -->
    </div>
    <!-- /弹层 -->
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import { findBrand } from '@/api/home.js'
export default {
  name: 'HomeCategory',
  // 得到9个分类+1个"品牌"分类
  setup () {
    const store = useStore()
    const brand = reactive({
      id: '1314',
      name: '品牌',
      children: [{ id: '13142', name: '品牌推荐' }],
      brands: []
    })
    const homeList = computed(() => {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })
    // 获取弹出层的推荐商品数据
    const categoryID = ref(null)
    const currentCategory = computed(() => {
      return homeList.value.find(item => item.id === categoryID.value)
    })

    // 调用接口函数,获取品牌数据
    findBrand().then(data => {
      brand.brands = data.result
    })
    return { homeList, categoryID, currentCategory }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
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
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255,255,255,0.8);
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
    }
    // 品牌的样式
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
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
