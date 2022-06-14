<template>
  <div class="home-entry">
    <div class="container">
      <!-- 分类栏 -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
      <HomeBanner/>
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew></HomeNew>
  <!-- 人气推荐 -->
  <HomeRecommend></HomeRecommend>
  <!-- 热门品牌 -->
  <HotBrands></HotBrands>
  <!-- 产品板块 -->
  <HomeProduct></HomeProduct>
  <!-- 最新专题 -->
  <HomeTheme></HomeTheme>
</template>

<script>
import HomeCategory from '@/views/home/components/HomeCategory.vue'
import HomeBanner from '@/views/home/components/HomeBanner.vue'
import HomeNew from '@/views/home/components/HomeNew.vue'
import HomeRecommend from '@/views/home/components/HomeRecommend.vue'
import HotBrands from '@/views/home/components/HomeBrands.vue'
import HomeProduct from '@/views/home/components/HomeProduct.vue'
import HomeTheme from '@/views/home/components/HomeTheme.vue'

export default {
  name: 'HomeCom',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeRecommend,
    HotBrands,
    HomeProduct,
    HomeTheme
  }
}
</script>

<style lang="less" scoped>
.container {
  .hoverShadow ()
}
</style>
