<template>
  <div>
    <h3>child2</h3>
    <button @click="sendToChild1">给child1发送消息</button>
     <!-- 非属性特性 -->
    <p>{{$attrs.foo}}</p>
    <grandson v-bind="$attrs" a="123" v-on="$listeners"></grandson>
  </div>
</template>

<script>
 import Grandson from './Grandson'
  export default {
    components: {
      Grandson
    },
    methods: {
      sendToChild1() {
        // this.$parent.$emit('msgFromChild2', 'message from child2')
        this.$bus.$emit('msgFromChild2', 'message from child2 by bus')
      }
    },
  }
</script>

<style  scoped>

</style>