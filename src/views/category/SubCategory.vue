<template>
  <div class="container">
    <!-- 二级类目面包屑 -->
    <SubBread/>
    <!-- 筛选区 -->
    <SubFilter/>
    <!-- 复选框 -->
    <!-- <XtxCheckbox v-model="isAllChecked">全选</XtxCheckbox>{{ isAllChecked }} -->
    <div class="goods-list">
    <!-- 排序组件 -->
      <SubSort @sortChange="sortChange"/>
      <!-- 商品列表 -->
      <ul>
        <li v-for="item in goods" :key="item.id" >
          <GoodsItem :goods="item" />
        </li>
      </ul>
      <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getGoodsList"/>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { goodsList2 } from '@/api/category'
import GoodsItem from './components/goods-item.vue'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    // const isAllChecked = ref(false)
    const route = useRoute()
    // 定义是否加载中
    const loading = ref(false)
    // 定义是否加载完毕
    const finished = ref(false)
    // 定义数据
    const goods = ref([])
    let postData = reactive({
      page: 1,
      pageSize: 20
    })
    const getGoodsList = (postData) => {
      loading.value = true
      goodsList2(postData).then(res => {
        if (res.result.items.length) {
          goods.value.push(...res.result.items)
          postData.page += 1
          // 如果有数据
          loading.value = false
        } else {
          finished.value = true
        }
      })
    }
    getGoodsList()

    // 切换二级分类重新加载
    watch(() => route.params.id, (newVal) => {
      if (newVal && route.path === ('/category/sub/' + newVal)) {
        goods.value = []
        postData = {
          page: 1,
          pageSize: 20
        }
        getGoodsList(postData)
      }
    })

    // 监听排序改变
    const sortChange = (val) => {
      postData = { ...postData, ...val }
      postData.page = 1
      goods.value = []
      finished.value = false
    }
    return { loading, finished, goods, sortChange, getGoodsList }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
