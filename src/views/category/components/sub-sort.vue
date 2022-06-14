<template>
  <div class='sub-sort'>
    <div class="sort">
      <a href="javascript:;"
        :class="{ active: postData.sortField === null }"
        @click="changeSort(null)"
        >默认排序</a>
      <a href="javascript:;"
        :class="{ active: postData.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        >最新商品</a>
      <a href="javascript:;"
        :class="{ active: postData.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        >最高人气</a>
      <a href="javascript:;"
        :class="{ active: postData.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        >评论最多</a>
      <a href="javascript:;"
        @click="changeSort('price')"
      >
        价格排序
        <i class="arrow up"
          :class="{ active: postData.sortMethod === 'asc' }"
          @change="changeCheck"
        />
        <i class="arrow down"
          :class="{ active: postData.sortMethod === 'desc' }"
          @change="changeCheck"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="postData.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="postData.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'SubSort',
  setup (props, { emit }) {
    const postData = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null,
      sortMethod: 'desc'
    })
    // 改变排序
    const changeSort = (sortField) => {
      if (sortField === 'price') {
        postData.sortField = sortField
        if (postData.sortMethod === null) {
          // 第一次点击，默认是降序
          postData.sortMethod = 'desc'
        } else {
          // 其他情况根据当前排序取反
          postData.sortMethod = postData.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 如果排序未改变停止逻辑
        if (postData.sortField === sortField) return
        postData.sortField = sortField
        postData.sortMethod = null
      }
      emit('sortChange', postData)
    }
    const changeCheck = () => {
      emit('sortChange', postData)
    }
    return { postData, changeSort, changeCheck }
  }
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    display: flex;
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
