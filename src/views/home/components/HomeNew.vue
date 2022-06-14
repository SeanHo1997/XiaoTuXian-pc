<template>
  <div class="home-new">
    <!-- 首页面板组件 -->
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质可靠" >
      <template #right>
        <XtxMore path="/" />
      </template>
      <div ref="target" style="position: relative;height: 406px;">
        <!-- vue3内置组件Transiton(提供过渡效果动画) -->
        <Transition name="fade">
          <ul class="goods-list" v-if="goods.length">
              <li v-for="item in goods" :key="item.id">
                <RouterLink :to="`/product/${item.id}`">
                  <img :src="item.picture" alt="">
                  <p class="name ellipsis">{{item.name}}</p>
                  <p class="price">&yen;{{item.price}}</p>
                </RouterLink>
              </li>
          </ul>
          <HomeSkeleton v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from '@/views/home/components/HomePanel.vue'
import { freshGoodGoods } from '@/api/home.js'
import HomeSkeleton from '@/views/home/components/home-skeleton.vue'
// 引入数据懒加载函数
import { lazyLoad } from '@/hooks/index.js'

export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    const { target, result } = lazyLoad(freshGoodGoods)
    return { target, goods: result }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
