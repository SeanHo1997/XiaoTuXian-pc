<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="item in list" :key="item.id" @mouseenter="showOpen(item.id)" @mouseleave="closeOpen(item.id)" @click="closeOpen(item.id)">
      <RouterLink :to="`/category/${item.id}`" >
      {{ item.name }}
      </RouterLink>
      <div class="layer" :class="{open: item.open} ">
        <ul>
          <li v-for="childItem in item.children" :key="childItem.id">
            <RouterLink :to="`/category/sub/${childItem.id}`" >
              <a href="#">
                <img :src="childItem.picture" alt="">
                <p>{{ childItem.name }}</p>
              </a>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })
    const showOpen = (id) => {
      store.commit('category/show', id)
    }
    const closeOpen = (id) => {
      store.commit('category/hide', id)
    }
    return { list, showOpen, closeOpen }
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
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
    }
    .layer {
      &.open {
        height: 132px;
        opacity: 1;
      }
      width: 1240px;
      background-color: #fff;
      position: absolute;
      left: -200px;
      top: 56px;
      height: 0;
      overflow: hidden;
      // height: 132px;
      // opacity: 0;
      box-shadow: 0 0 5px #ccc;
      transition: all .2s .1s;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 70px;
        align-items: center;
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
  }
}
</style>
