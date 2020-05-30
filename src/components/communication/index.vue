<template>
  <div>
    <h2>组建通信</h2>
    <!-- props, 自定义事件 -->
    <child1 msg="message from patent" @onSomeEvent='onSomeEvent'></child1>
    <!-- 事件总线 -->
    <child2 foo="foo" @onSomeEvent='onSomeEvent'></child2>
  
  </div>
</template>

<script>
  import Child1 from './Child1'
  import Child2 from './Child2'

  export default {
    name: 'grandpa',
    provide () {
      return {
        bar: 'bar-text',
        grandpa: this
      }
    },
    components: {
      Child1,
      Child2
    },
    mounted () {
      // 触发组件2的方法向组件1发送数据
      this.$children[1].sendToChild1();
    },
    methods: {
      onSomeEvent(msg) {
        console.log('Communition:', msg);
      }
    }
  }
</script>

<style scoped>

</style>