<template>
  <div>
    <Form :model='model' :rules='rules' ref="form">
      <form-item label='用户名' prop="userName">
        <form-input v-model="model.userName" ></form-input>
      </form-item>
      <form-item label='密码' prop="password">
        <form-input v-model="model.password" ></form-input>
      </form-item>
      <form-item >
        <button @click="login">登录</button>
      </form-item>
    </Form>
  </div>
</template>

<script>
  import Form from './Form'
  import FormItem from './FormItem'
  import FormInput from './FormInput'
  export default {
    components: {
      Form,
      FormItem,
      FormInput
    },
    data() {
      return {
        model: {
          userName: '',
          password: ''
        },
        // 校验规则，async-validator
        rules: {
          userName: [
            {required: true, message: '请输入用户名'}
          ],
          password: [
            {required: true, message: '请输入用密码'}
          ]
        }
      }
    },
    methods: {
      login() {
        this.$refs.form.validate(isTrue => {
          // if (isTrue) {
          //   console.log('请求登录！！！');
          // } else {
          //   alert('校验失败！！！！')
          // }
          this.$Notice({
            title: '校验结果',
            message: isTrue ? '请求登录' : '校验失败',
            duration: 2000
          }).show()
        })
      }
    }
  }
</script>

<style scoped>

</style>