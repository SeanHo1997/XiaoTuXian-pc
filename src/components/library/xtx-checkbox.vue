<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-xuanzhong"></i>
    <i v-else class="iconfont icon-xuanzekuang"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value
      emit('update:modelValue', checked.value)
    }
    watch(() => props.modelValue, () => {
      checked.value = props.modelValue
    }, { immediate: true })
    return { checked, changeChecked }
  }
}
</script>

<style scoped lang="less">
i {
  &:hover,
  &.icon-xuanzhong
   {
    color: @xtxColor;
  }
}
</style>
