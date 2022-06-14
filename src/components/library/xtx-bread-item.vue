<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
  <i class="iconfont icon-jiantou"></i>
</template>

<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    &:last-child {
      display: none;
    }
  }
}
</style>
