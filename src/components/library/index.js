// 插件 = 扩展vue原有的功能的东西：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

import defaultImg from '@/assets/images/logo.png'
import Message from './Message'

// 批量注册组件 require.context(dir, deep, matching)
// 参数1: 目录 参数2: 布尔值(是否加载子目录) 参数3: 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
// 此时可以拿到文件名称数组
// console.dir(importFn.keys())

// 自定义指令
const defineDirectives = (app) => {
  // 图片懒加载
  app.directive('lazyImage', {
    // 相当于vue2中的inserted(被绑定指令的元素插入dom时触发)
    mounted (el, binding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          // console.log('进入可视区', el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      })
    }
  }, {
    threshold: 0
  })
}

export default {
  install (app) {
    // // 在app上进行扩展，app提供 component directive 函数
    // // 如果要挂载原型 app.config.globalProperties 方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)
    importFn.keys().forEach(key => {
      const component = importFn(key).default
      app.component(component.name, component)
    })
    defineDirectives(app)

    // 如果你想挂载全局的属性，能够通过组件实例调用的属性   this.$message
    app.config.globalProperties.$message = Message// 原型函数
  }
}
