<template>
  <div class="app-header-sticky" :class="{show: y > 78}">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/" >品牌</RouterLink>
        <RouterLink to="/" >专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from './AppHeadersNav.vue'
// import { onMounted, ref } from 'vue'
// @vueuse/core第三方库简化组合API的使用
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  setup () {
    // 记录y轴滚动的高度
    // const y = ref(0)
    // onMounted(() => {
    //   window.onscroll = () => {
    //     const scrollTop = document.documentElement.scrollTop
    //     y.value = scrollTop
    //   }
    // })
    const { y } = useWindowScroll()
    return { y }
  }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 先隐藏
  transform: translateY(-100%);
  opacity: 0;
  // 当有show类名时显示
  &.show {
    transform: none;
    opacity: 1;
    transition: all 0.5s linear;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
