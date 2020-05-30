<template>
  <div class="wrapper">
    <div class="header" >
      <slot name="title"></slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer" a='作用域插槽' b='123'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>