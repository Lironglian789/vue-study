<template>
  <div>
    <input :type="type" :value="value" @input="onInput">
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      }
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)
        // 数据变化时执行校验
        this.$parent.$emit('validate')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>