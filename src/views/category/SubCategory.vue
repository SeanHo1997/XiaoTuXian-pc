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
        <li v-for="i in 20" :key="i" >
          <GoodsItem :goods="{}" />
        </li>
      </ul>
      <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="goodsList"/>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { goodsList } from '@/api/category'
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
    const loading = ref(false)
    const finished = ref(false)
    const goods = ref([])
    let postData = reactive({
      page: 1,
      pageSize: 20
    })
    goodsList(postData).then(res => {
      loading.value = true
      if (res.result.items.length) {
        goods.value.push(...res.result.items)
        postData.page += 1
      } else {
        finished.value = true
      }
      loading.value = false
    })

    // 切换二级分类重新加载
    watch(() => route.params.id, (newVal) => {
      if (newVal && route.path === ('/category/sub/' + newVal)) {
        goods.value = []
        postData = {
          page: 1,
          pageSize: 20
        }
        finished.value = false
      }
    })

    // 监听排序改变
    const sortChange = (val) => {
      postData = { ...postData, ...val }
      postData.page = 1
      goodsList.value = []
      finished.value = false
    }

    return { loading, finished, goods, goodsList, sortChange }
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
