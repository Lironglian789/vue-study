import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  title = 'abc'

  handleClick() {
    console.log('handleClick' + this)
  }

  render(h) {
    return <div class="hello">
      <h1 onClick={this.handleClick}>{ this.msg }</h1>
      <input type="text" v-model={this.title}/>
    </div>
  }
}