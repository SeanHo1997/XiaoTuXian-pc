<template>
  <div class="home-recommend">
    <!-- 首页面板组件 -->
    <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
      <div ref="target" style="position: relative;height: 426px;">
        <Transition name="fade">
        <!-- 面板内容 -->
          <ul class="recommend-list" v-if="recommendList.length" >
            <li v-for="item in recommendList" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="">
                <p class="name ellipsis">{{item.title}}</p>
                <p class="price">{{item.alt}}</p>
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
import { hotRecommend } from '@/api/home.js'
import { lazyLoad } from '@/hooks/index.js'
import HomeSkeleton from '@/views/home/components/home-skeleton.vue'

export default {
  name: 'HomeRecommend',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    const { target, result } = lazyLoad(hotRecommend)
    return { target, recommendList: result }
  }
}
</script>
<style scoped lang="less">
.recommend-list {
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
      color: gray;
      font-size: 18px;
    }
  }
}
</style>
