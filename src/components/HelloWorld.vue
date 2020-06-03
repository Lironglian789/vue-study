<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- 组件通信 -->
    <!-- <communication></communication> -->
    <!-- 插槽 -->
    <!-- <slot-example></slot-example> -->
    <!-- 表单 -->
    <!-- <form-example></form-example> -->
    <p @click="$store.commit('add')">commit(sync): {{$store.state.count}}</p>
    <p @click="$store.dispath('add')">dispath(async): {{$store.state.count}}</p>
    <p >getter(count): {{$store.getters.doubleCounter}}</p>
    <p >getter(num): {{$store.getters.doubleNum}}</p>
  </div>
</template>

<script>
import Communication from '@/components/communication'
import SlotExample from '@/components/slot'
import FormExample from '@/components/form'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Communication,
    SlotExample,
    FormExample
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
