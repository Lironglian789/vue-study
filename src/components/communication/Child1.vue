<template>
  <div>
    <h3>children1</h3>
    <p>{{msg}}</p>
    <button @click="$emit('onSomeEvent', 'msg from child1')">to parent</button>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false, // 传递的参数若果没有定义props接收，则会作为html属性处理写到根元素上，设置为false时避免写到根元素上
    props: {
      msg: {
        type: String,
        default: 'no msg'
      }
    },
    mounted () {
      // this.$parent.$on('msgFromChild2', msg => {
      //   console.log('Child1:', msg)
      // })
      this.$bus.$on('msgFromChild2', msg => {
        console.log('Child1:', msg)
      })
    },
  }
</script>

<style scoped>

</style>