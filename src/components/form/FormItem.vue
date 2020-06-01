<template>
  <div>
    <label>{{label}}</label>
    <slot></slot>
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template>

<script>
  import Schema from "async-validator"
  import emitter from '@/mixins/emitter'


  export default {
    compomentName: 'FormItem',
    mixins: [emitter],
    inject: ['form'],
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        error: ''
      }
    },
    mounted () {
      this.$on('validate', () => {
        this.validate()
      });
      // 派发事件，通知FormI增加一个FormItem实例
      if (this.prop) {
        this.dispatch('Form', 'Form.addField', [this] )
      }
    },
    methods: {
      validate() {
        // 1. 获取校验规则
        const rules = this.form.rules[this.prop]
        // 2. 获取当前值
        const value = this.form.model[this.prop]
        // 3. 创建校验器
        const schema = new Schema({
          // 计算属性
          [this.prop]: rules
        })
        // 4. 执行校验
        return schema.validate({
          [this.prop]: value
        }, err => {
          if (err) {
            this.error = err[0].message
          } else {
            this.error = ''
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>