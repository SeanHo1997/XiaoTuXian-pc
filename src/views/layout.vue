<template>
  <AppNavBar/>
  <AppHeader/>
  <!-- 吸顶头部组件 -->
  <AppHeaderSticky/>
  <main class="main">
    <!-- 二级路由 -->
    <RouterView/>
  </main>
  <AppFooter/>
</template>

<script>
import AppNavBar from '@/components/AppNavBar.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useStore } from 'vuex'
import AppHeaderSticky from '@/components/AppHeaderSticky.vue'

export default {
  name: 'IndexCom',
  components: {
    AppNavBar,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 800px;
}
</style>
