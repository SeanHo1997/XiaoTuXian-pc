<template>
  <div class="sub-filter" v-if="filterData && !isLoading">
     <div class="item">
       <div class="head">品牌</div>
       <div class="body">
         <a href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
          :class="{active: filterData.selectedId === item.id}"
          @click="changeBrand"
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
          @click="changeProp(subItem, subItem.id)"
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
// import { findSubCategoryFilter } from '@/api/category'
import { goodsList2 } from '@/api/category'
import { ref, watch, emit } from 'vue'
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
      goodsList2(route.params.id).then(res => {
        res.result.brands.unshift({ id: null, name: '全部' })
        res.result.categories.unshift({ id: null, name: '全部' })
        res.result.saleProperties.forEach(item => {
          item.properties.unshift({ id: null, name: '全部' })
        })
        filterData.value = res.result
        filterData.value.selectedId = null
        isLoading = false
      })
    }, { immediate: true })

    // 获取筛选参数的函数
    const getFilterParams = () => {
      const obj = { brandId: null, attrs: [] }
      // 品牌
      obj.brandId = filterData.value.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedProp) {
          const prop = item.properties.find(prop => prop.id === item.selectedProp)
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      if (obj.attrs.length === 0) obj.attrs = null
      return obj
    }

    const changeBrand = brandId => {
      if (filterData.value.selectedBrand === brandId) {
        return
      }
      filterData.value.selectedId = brandId
      emit('filter-change', getFilterParams())
    }
    const changeProp = (item, propId) => {
      if (item.selectedProp === propId) {
        return
      }
      filterData.value.selectedId = propId
      emit('filter-change', getFilterParams())
    }

    // // 2更改筛选组件的筛选数据.重新请求
    // const filterChange = (filterParams) => {
    //   // console.log('filter')
    //   finished.value = false
    //   reqParams = { ...reqParams, ...filterParams }
    //   reqParams.page = 1
    //   goodsList.value = []
    // }

    return { filterData, isLoading, changeBrand, changeProp, getFilterParams }
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
