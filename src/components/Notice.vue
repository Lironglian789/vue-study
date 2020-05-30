<template>
  <div class="box" v-if="isShow">
    <h2>{{title}}</h2>
    <p class="box-content">{{message}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '默认标题'
      },
      message: {
        type: String,
        default: ''
      },
      duration: {
        type: Number,
        default: ''
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      show() {
        this.isShow = true
        console.log(this.isShow)
        setTimeout(this.hide, this.duration)
      },
      hide () {
        this.isShow = false
        this.remove()
      }
    }
  }
</script>

<style>
.box {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
  background-color: #fff;
  border: grey 3px solid;
  box-sizing: border-box;
}
.box-content {
  width: 200px;
  margin: 10px auto;
  font-size: 14px;  
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  margin-bottom: 8px;
}
</style>