<template>
  <div>
    <input :type="type" :value="value" @input="onInput">
  </div>
</template>

<script>
  import emitter from '@/mixins/emitter'

  export default {
    mixins: [emitter],
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
        // 数据变化时执行校验(耦合性太强)
        // this.$parent.$emit('validate')
        // 进行解耦处理
        this.dispatch('FormItem', 'validate')
      }
    }
  }
</script>

<style  scoped>

</style>