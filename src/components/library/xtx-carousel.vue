<template>
  <div class='xtx-carousel' @mouseenter="stopTimer" @mouseleave="startTimer">
    <!-- 轮播图图片容器 -->
    <ul class="carousel-body">
      <li class="carousel-item " v-for="(item, i) in sliders" :key="i" :class="{fade:index===i}">
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张按钮 -->
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)"><i class="iconfont icon-zuojiantou"></i></a>
    <!-- 下一张按钮 -->
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)"><i class="iconfont icon-jiantou"></i></a>
    <!-- 五个小圆点指示器 -->
    <div class="carousel-indicator">
      <span v-for="(item, i) in sliders" :key="i" :class="{active:index===i}" @click="index=i"></span>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue'

export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    autoDuration: {
      type: Number,
      default: 2000
    }
  },
  setup (props) {
    const index = ref(0)
    // 自动轮播业务逻辑
    let timer = null
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        index.value += 1
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.autoDuration)
    }
    // 只有sliders里面有数据后 且 autoPlay是true后才开始执行autoPlayFn
    watch(() => props.sliders, (newVal) => {
      if (newVal.length) {
        autoPlayFn()
      }
    })
    // 鼠标进入后关闭定时器，离开时开启定时器
    const stopTimer = () => {
      clearInterval(timer)
    }
    const startTimer = () => {
      autoPlayFn()
    }
    const toggle = (n) => {
      index.value += n
      if (index.value >= props.sliders.length) {
        index.value = 0
      } else if (index.value < 0) {
        index.value = props.sliders.length
      }
    }
    // 清除定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { index, stopTimer, startTimer, toggle }
  }
}
</script>

<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
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
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
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
