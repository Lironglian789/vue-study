<template>
  <div>
    <h2>插槽</h2>
    <layout>
      <!-- 具名插槽 -->
      <template v-slot:title>我是具名插槽</template>
      <!-- 默认插槽 v-slot:default-->
      <template>我是默认插槽</template>
      <!-- 作用域插槽 -->
      <template v-slot:footer='slotProps'>{{slotProps.a}} {{slotProps.b}}</template>
      <!-- 解构方式获取 -->
      <!-- <template v-slot:footer='{a,b}'>{{a}} {{b}}</template> -->
    </layout>
  </div>
</template>

<script>
  import Layout from './Layout'
  export default {
    components: {
      Layout
    }
  }
</script>

<style scoped>

</style>