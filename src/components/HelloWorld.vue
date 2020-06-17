<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" @keyup.enter="addFeatrue">
    <ul>
      <li>{{count}}</li>
      <li :class="{'selected': item.selected}" v-for="(item, index) in features" :key="index"> {{item.name}}</li>
    </ul> 
  </div>
</template>

<script lang="ts">
// 定义组件的撒中方式
// 1. class-style
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

type Feature = {
  id: number,
  name: string
}

// interface和type很相似
// type Select = {
//   selected: boolean
// }
interface Select {
  selected: boolean
}

type FeatureSelect = Feature & Select

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  // 类的属性直接转换为data
  features:FeatureSelect[] = [
    // {id: 1, name:'类型注解', selected: true},
    // {id: 2, name: '静态类型检测', selected: false}
  ]

  // 生命周期的同名方法作为生命周期钩子使用
  async created () {
    // 模拟接口
    const resp = await axios.get<FeatureSelect[]>('/api/list')
    this.features = resp.data
  }

  // 方法直接作为methods选项
  addFeatrue (e:KeyboardEvent) {
    // 获取input的value属性
    // 如果特别明确类型，可以做类型断言
    const inp = e.target as HTMLInputElement
    const val = inp.value
    const feature: FeatureSelect  =  {
      id: this.features.length + 1,
      name: val,
      selected: false
    }
    this.features.push(feature)
    inp.value = ''
  }
  // 存取器作为计算属性
  get count () {
    return this.features.length
  }
}

// 2. option-style (跟以前无区别，但可以获得代码提示)
// export default Vue.extend({
//   props: ['msg'],
//   mounted () {
//     this.msg
//   }
// })

// 3. 见tsxComp
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 10px 10px 0px;
}
a {
  color: #42b983;
}
.selected{
  background:lightblue
}
</style>
