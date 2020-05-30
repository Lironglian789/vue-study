<template>
  <div>
    <h3>children1</h3>
    <p>{{msg}}</p>
    <button @click="$emit('onSomeEvent', 'msg from child1')">to parent</button>
  </div>
</template>

<script>
  export default {
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