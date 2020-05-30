<template>
  <div>
    <h3>Grandson</h3>
    <!-- 非属性特性 -->
    <!-- <p>{{foo}}</p> -->
    <p>{{$attrs.foo}} {{$attrs.a}}</p>
    <!-- 隔代传值 -->
    <p>{{baz}}</p>
    <p>{{grand.$options.name}}</p>
    <button @click="$emit('onSomeEvent', 'msg from grandson')">给爷爷发送消息</button>
  </div>
</template>

<script>
  export default {
    inject:{
      baz: 'bar',
      grand: {
        from: 'grandpa',
        default: ''
      }
    },
    // props: {
    //   foo: {
    //     type: String,
    //     defaut: ''
    //   }
    // },
    mounted () {
      console.log(this.grand);
    },
  }
</script>

<style scoped>


</style>