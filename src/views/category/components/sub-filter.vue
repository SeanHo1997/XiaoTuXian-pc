<template>
  <div class="sub-filter" v-if="filterData && !isLoading">
     <div class="item">
       <div class="head">品牌</div>
       <div class="body">
         <a href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
          :class="{active: filterData.selectedId === item.id}"
          @click="filterData.selectedId = item.id"
          >{{ item.name }}</a>
       </div>
     </div>
     <div class="item">
       <div class="head">分类</div>
       <div class="body">
         <a href="javascript:;"
          v-for="item in filterData.categories"
          :key="item.id"
          :class="{active: filterData.selectedId === item.id}"
          @click="filterData.selectedId = item.id"
          >{{ item.name }}</a>
       </div>
     </div>
     <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
       <div class="head">{{ item.name }}</div>
       <div class="body">
         <a href="javascript:;"
          v-for="subItem in item.properties"
          :key="subItem.id"
          :class="{active: filterData.selectedId === subItem.id}"
          @click="filterData.selectedId = subItem.id"
          >{{ subItem.name }}</a>
       </div>
     </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>

<script>
import { findSubCategoryFilter } from '@/api/category'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SubFilter',
  setup () {
    const route = useRoute()
    const filterData = ref(null)
    // 骨架效果
    let isLoading = ref(false)
    // 监听二级类目路由变化
    watch(() => route.params.id, (newVal) => {
      isLoading = true
      findSubCategoryFilter(route.params.id).then(res => {
        res.result.brands.unshift({ id: null, name: '全部' })
        res.result.categories.unshift({ id: null, name: '全部' })
        res.result.saleProperties.forEach(item => {
          item.properties.unshift({ id: null, name: '全部' })
        })
        filterData.value = res.result
        filterData.value.selectedId = null
        isLoading = false
      })
    })
    return { filterData, isLoading }
  }
}
</script>

<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
