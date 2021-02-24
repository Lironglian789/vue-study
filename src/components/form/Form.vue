<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import emitter from '@/mixins/emitter'
  export default {
    componentName: 'Form',
    mixins: [emitter],
    provide() {
      return {
        form: this
      }
    },
    props: {
      model: {
        type: Object,
        required: true
      },
      rules: Object
    },
    // data () {
    //   return {
    //     field: []
    //   }
    // },
    created () {
      // 没有必要响应，可以不放data
      this.field = [];
      this.$on('Form.addField', item => {
        this.field.push(item)
      })
    },
    methods: {
      validate(cb) {
        // 全局校验
        // 获取到所有的FormItem
        // 获得[Promise,....]
        // 方案1 耦合性太强
        // const tasks = this.$children
        // .filter(item => item.prop) // 过滤掉没有prop属性的Item
        // .map(item => item.validate())
        
        // 方案2 进行解耦处理
        const tasks = this.field.map(item => item.validate())

        // 执行他们的校验方法，如果大家的Promise全部都resolve，校验通过
        // 如果其中有reject，catch()中可以处理错误提示信息
        Promise.all(tasks)
        .then(() =>  cb(true))
        .catch(() => cb(false))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>