<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  // render函数返回html结构,返回的是组件内容
  // vue2的h函数是传参进来的，vue3的h是导入进来的
  render () {
    // h的三个参数: 1:标签名 2:标签属性对象 3:子节点
    // 需求: 1创建xtx-bread组件的父容器
    // 2获取默认插槽内容
    // 3去除xtx-bread-item组件的i标签，由render函数组织
    // 4.遍历插槽中的item,得到一个动态创建的节点
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style lang='less'>
// 去除scoped属性，目的是xtx-bread-item组件的样式作用于此
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
  }
}
</style>
