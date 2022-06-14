<template>
    <!-- 首页面板组件 -->
    <HomePanel title="热门品牌" subTitle="国际经典 品质保证">
      <template #right>
        <!-- 上一页 -->
        <a href="javascript:;" class="iconfont icon-zuojiantou prev" @click="flip(0)" :class="{disabled: page=== 0}"></a>
        <!-- 下一页 -->
        <a href="javascript:;" class="iconfont icon-jiantou next" @click="flip(1)" :class="{disabled: page=== 1}"></a>
      </template>
      <!-- 面板内容 -->
      <div class="box" ref="target">
        <Transition name="fade">
          <ul class="list" :style="{transform:`translate(${-page*1240}px)`}" v-if="hotBrandsList.length">
            <li v-for="item in hotBrandsList" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="">
              </RouterLink>
            </li>
          </ul>
        <div class='skeleton' v-else>
          <XtxSkeleton class="item" v-for="i in 5" :key="i" bg="#e4e4e4" width="240px" height="305px" animated />
        </div>
        </Transition>
      </div>
    </HomePanel>
</template>
<script>
import HomePanel from '@/views/home/components/HomePanel.vue'
import { hotBrands } from '@/api/home.js'
import { lazyLoad } from '@/hooks'
import { ref } from 'vue'
import XtxSkeleton from '@/components/library/xtx-skeleton.vue'

export default {
  name: 'HomeBrands',
  components: {
    HomePanel,
    XtxSkeleton
  },
  setup () {
    const { target, result } = lazyLoad(hotBrands)
    const page = ref(0)
    const flip = (n) => {
      page.value = n
    }
    return { hotBrandsList: result, target, page, flip }
  }
}
</script>

<style scoped lang="less">
home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
