### 问题汇总

#### 基础

1. 原型和原型链
2. 作用域和作用域链
3. 闭包
4. new 的实现
5. promise



### Vue 相关

1. MVVM ？
2. Vue 双向数据绑定原理？
3. Vue 生命周期？
4. Vue 组件之间通信的方法？
5. Vue 内置指令有哪些，作用是什么？
6. Vue 内置组件有哪些，作用是什么？
7. 高级特性，nextTick，mixins，异步组件
8. Vue-router 的使用
9. Vuex 的使用
10. Vue 循环中 key 的作用
11. 自定义组件，指令，过滤器
12. Vue，React，Angular 之间的比较



### React 相关

#### Webpack 相关

#### 网络相关



---

### 问题解答

#### 基础

略

### Vue

1. MVVM ？

   M：Model，数据模型，对应 vue 中的 data；

   V：View，视图，对应 vue 中的 template；

   VM：就是 vue 框架所做的事情。View 层事件发送到 VM 处理，VM 处理之后，又反馈到 Model 层更改，数据劫持又用来刷新 View。

2. Vue 双向数据绑定原理？

   通过数据劫持和发布订阅者模式的方式实现，数据劫持使用 defineProperty 劫持 getter 和 setter，在编译 vue 模板的时候，添加相应的订阅者，将模板渲染方法和对应的 data 里面的数据关联起来，触发 setter 的时候，将通知所有相关订阅者，触发相应的监听回调。这是从 data 到视图的单向数据绑定。

   而从视图到 data，则是对于 input 和 textarea，radio 等表单元素，监听 onChange 事件，回调为改变 v-model 中对应的 data 中的值。

3. Vue 的生命周期？

   - beforeCreated/created
   - beforeMounted/mounted
   - beforeUpdate/updated
   - beforeDestroy/destroyed
   - actvied/deactived    

   以上几个生命周期总是成对出现，前8个为 before 和 ed，分别表示进行前，和已完成；actived 和 deactived 则表示相反，分别表示使用 keep-alive 时，对应的组件激活和未激活状态。

   create => 代理 data，props，methods，watch，computed 等

   mount => 模板编译，生成 DOM 结构

   update => 更新视图

   destroy => 销毁组件

   代理 =》编译模板 =》(更新视图) =》销毁，更新视图发生在组件激活数据改变时，可能执行多次这两个生命钩子。

4. Vue 组件之间通信的方法？

   - props 和 $emit 。或者 props 加父组件传入方法给子组件，子组件通过执行父组件方法传入参数。

   父组件通过 v-bind 或者 ':'，传入数据，子组件通过 props 接收数据；子组件通过调用 this.$emit('事件名'，数据)，父组件在子组件上通过 "@" 监听事件，回调。

   ```html
   // 父组件
   <template>
     <HelloWorld @helloClick="handleHelloClick" :text="btnText"></HelloWorld>
   </template>
   <script>
   import HelloWorld from './hello-world'
   export default {
     components:{
       HelloWorld,
     },
   	data(){
       return {
         btnText:'按钮文字'
       }
     },
   	methods:{
       handleHelloClick(val){
         console.log(val); // '传递的值'
       }
   	}
   }
   </script>
   
   // 子组件
   <template>
    <button @click="bindClick">{{text}}</button>
   </template>
   <script>
   export default {
   	name:'hell-world',
     props:['text'],
     methods:{
   		bindClick(){
   			this.$emit('helloClick','传递的值')
   		}
     }
   }
   </script>
   ```

   - 示例化一个 Vue 实例当中转站，在不同的组件中引入该实例，通过该实例的 $on 监听事件，\$emit 发布事件和数据。

   ```js
   // bus.js
   import Vue from 'vue';
   export const BusService = new Vue();
   
   // a.vue
   import { BusService } from './bus.js'
   BusService.$emit('from a','a-data');
   
   // b.vue
   import { BusService } from './bus.js'
   BusService.$on('from a',function(data){
     console.log(data); // 'a-data'
   });
   ```

   - vuex，全局状态管理

5. Vue 内置指令有哪些，作用是什么？
   - v-bind ，绑定数据，可用 ":" 代替
   - v-on，绑定事件，可用 "@" 代替
   - v-model，双向数据绑定
   - v-show，条件显示隐藏，为 false 时，display 为 none
   - v-if，条件渲染，与 v-show 不同的时，为 false 时在 DOM 中是不存在的
   - v-else，与 v-if 成对出现，v-if 的反面
   - v-text，等同于 {{}}，{{}}会有闪现，可用 v-text 绑定解决
   - v-html，用于富文本

6. 内置组件？
   - component
   - transition 动画
   - transtion-grounp
   - keep-alive 缓存组件
   - slot 插槽








