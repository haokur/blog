
## 上干货

从以下几个方面整理：

- vue 用法
- vue-router 用法
- webpack 打包
- 遇到的坑

## 一、Vue 用法

##### 1. 通常写的 .vue 文件，实则是在写 vue 的配置文件，最终将执行 new Vue() 的操作，传入这些配置。

```js
new Vue({
  data(){
    return {
      name:'xx'
    }
  }
})

// 常编写的.vue文件
export default {
  data(){
    return {
      name:'xx'
    }
  }
}
```

##### 2. 常用组件可以在全局注册。

- 组件代码，TestComp.vue
```html
<template>
	<div>
    test component
  </div>
</template>
<script>
export default {}
</script>
```
- 注册组件，Vue.component 注册


```js
// main.js
import Vue from 'vue';
import TestComp from './TestComp.vue'
Vue.component('test-comp',TestComp);
```
> 以上 main.js 中也可以通过 Vue.use 注册，其实实质还是调用 Vue.Component，对应的 use 的需要有一个 install 函数，使用 Vue.use 将触发 install 执行，然后在 install 中执行 Vue.component 操作。

```js
// my-components.js
import TestComp from './TestComp.vue'
export default {
	install(Vue){
    Vue.component('test-comp',TestComp)
    // 这里还可以有多个注册 vue.component vue.directive, vue.filter 等
  }
}
// main.js
import Vue from 'vue';
import MyComponents from './my-components.js';
Vue.use(MyComponents)
```

##### 3. 用的比较多的指令，过滤器，mixin，可以在全局配置

```js
/* 1、 注册指令 */
Vue.directive('')

/* 2、注册过滤器 */
Vue.filter('filterName',(val,...args)=>{
  console.log(args); 
  return val;
})
// 过滤器使用 {{ 'abc' | filterName(1,2,3) }}
// value = 'abc' args 为 [1，2，3]

/* 3、全局 mixin (不建议) */
Vue.mixin({
  mounted(){
    console.log('每个组件中都将执行这里')
  }
})
```

##### 4. keep-alive 的使用，可以缓存组件，可以通过 exclude 排除不需缓存的组件，include 包含需要缓存的，max 定义最大缓存的组件数。exclude，include 传入一个数组，元素对应组件的 name 属性，max 传入数字。

```html
<keep-alive :incude="['home','list']" :max="3">
  <router-view></router-view>
</keep-alive>
```

##### 5. 在页面跳转时，新打开的页面滚动条可能缓存了滚动条位置，在中间的位置，进入页面或者在路由钩子的 afterEach 中执行 window.scroll(0,0) 重置到顶部。
##### 6. 非直接父子组件之间的通信，使用一个空 vue 对象实现通信。

```js
// Bus.js
import Vue from 'vue'
export const Bus = new Vue()

// a.vue
import Bus from './bus.js'
Bus.$emit('event_add_cart',1)

// b.vue
import Bus from './bus.js'
Bus.$on('event_add_cart',(num)=>{
  this.cartNum += num
})
```

> a.vue 和 b.vue，引用 bus.js ，Bus 为同一个实例，并不会重复创建，bus.js 就相当于一个调度中心，可以无数个组件，都和它建立链接，发布事件，然后 bus 将发布到给每一个建立链接的组件。

##### 7. computed 只有在依赖的 data 里面的值改变时，才会改变，优于直接在模板里执行表达式和方法，因为模板中的方法和模板，在每次 Vue 刷新视图时，都将重新执行一遍。
##### 8. data 需要是一个函数返回一个对象，如果直接赋值一个对象时，做不到隔离同一个组件的数据效果，都将公用同一份数据。
##### 9. 在 vue 组件销毁（beforeDestroy）前，清理定时器和 DOM 事件绑定。
##### 10. 在循环中使用 key，提升渲染性能，key 尽量不用数组下标，有 key 则 diff 算法就比较 key 值，最大程度上使用原组件，而不是销毁原来的组件后重建。
##### 11. v-for 可以和  v-if 同时使用，先循环再判断，所以可以有选择的渲染数组中的元素，而 angular 中是不支持同一个标签上同时存在 for 和 if 指令的。可能 eslint 会提示报错不建议混合使用，eslint 建议使用改变数组源数据的方式来实现，可以在 computed 中使用数组的 filter 过滤掉不想要的数据。

##### 12. 模板中 template 的使用，当几个同级的元素，需要依赖同一个指令时，又不想添加额外的标签将这些元素包裹时，可以使用 template，template 将不会渲染。在 template 使用 v-for 时，key 值需要添加在子元素上。

```html
<template>
	<div>
    <template v-for="(item,index) in [1,2,3]">
      <div :key="index">
        {{item}}
      </div>
    </template>
		<template v-if="2>1">
			<div>
        2大于1
      </div>
			<div>
        2>1
      </div>	
		</template>
  </div>
</template>
```

##### 13. 在 data 初始化时，对象类型的数据类型，如果不给初始化，单独改变值时，页面是不会响应该值的变化的。

```html
<template>
	<div>
    {{info.name}}
    {{info.age}}
    <div v-for="(item,index) in arr"
         :key="index">{{item}}</div>
  </div>
</template>
<script>
 export default {
   data(){
     return {
       info:{ age:1 },
       arr:[],
		 }
   },
   mounted(){
     this.info.name = 'xx'; // 并不能触发页面更新
     this.info.age = 2; // 这样子可以触发页面更新
     this.info = {name:'xx'}; // 这样子可以触发页面更新
     
     // 数组同理
     this.arr[0] = 1; // 并不能触发页面更新
     this.arr = [1]; // 这样子可以触发页面更新
   }
 }
</script>
```

> 因为 Vue 在初始化时需要对 data 进行使用 defineProperty 进行 set 和 get 的劫持，如果对象中的值为空，那就不会存在相应的 set 和 get，所以两者方式，一个给对象里面设置初值，二个将对象改为一个新对象，而不是直接在上面添加属性和值。

基于以上，还有一个使用技巧，则是，一些表单如果依赖后台返回的一些数据初始化选择列表等，那么可以在赋值前，先在返回的数组中，加上一个属性，例如 isChecked，然后再赋值给 data 

```html
<template>
	<div>
   <template v-for="(item,index) in checkboxs">
      <input type="checkbox"
             v-model="item.isChecked"
             :key="index">
    </template>
  </div>
</template>
<script>
export default {
	data(){
    return {
      checkboxs:[]
		}
  },
  methods:{
    getData(){
      // 请求过程略 
      let data = [{name:'zs',name:'ls'}] // 原请求返回数据
      this.checkboxs = data.forEach(item=>Object.assign(item,{isChecked:false}))
    }
	}
}
</script>
```

##### 14. 开发组件时，可以用 slot 占位，内容在使用组件的地方填充，使组件更加灵活。

##### 15. 在开发管理后台时，可以将通用的数据和方法，写在 mixin 里面，然后在页面中注入，如通用表格的页码配置数据，加载中状态值，还有获取上一页，下一页的方法。

##### 16. 在查看大图的场景中，点开大图，安卓物理键返回时，需要关闭大图，而不进行页面的跳转，则是可以在点开大图的时候，pushState 在 history 中添加一个路由，如果页面需要点击关闭的功能，则需要在点关闭按钮时，手动触发 history.go(-1) 一下;

##### 17. 如果在例如一个操作结果页(比如支付完成)，然后又不能手动配置分享内容的时候，又需要分享的是购买的商品时，则可以通过 replaceState 方法改变路由，但是又不会触发页面刷新，再分享时，app或者浏览器则会自动抓取到替换后的地址分享出去了。

##### 18. 父组件可以通过 @hook:created @hook:mounted 等监听到子组件的生命周期。

##### 19. errorCaptured 捕获子孙组件的错误。

##### 20. slot 插槽的使用

- 匿名插槽

```html
// child.vue
<template>
<header>
  <slot>all header</slot>
  </header>
</template>

// parent.vue
<template>
<child>
  <div>this is custom header</div>
  </child>
</template>
```
> slot 中可以有默认值

- 具名插槽
  
```html
  // child.vue
<template>
  <header>
    <slot name="left">left</slot>
    <slot name="right">right</slot>
  </header>
</template>

// parent.vue
<template>
  <child>
    <div slot="left">custom left</div>
    <div slot="right">custom right</div>
    <div slot="right">custom right2</div>
  </child>
</template>
```

> 具名插槽可以有一个以上同样 name 的填充。注意组件中用 slot + name ，使用时用 slot=name ，这里容易搞混。

- 带值传递插槽，slot-scope，也就是子组件的值传递给父组件

```html
// child.vue
<template>
  <header>
    <slot :user="userinfo"
    :address="address"></slot>
  </header>
</template>
<script>
export default {
  data() {
    return {
      userinfo: { name: 'haokur' },
      address: { city: 'guangzhou' },
    }
  },
}
</script>

// parent.vue
<template>
  <div>
    <Child>
      <template slot-scope="row">
      {{JSON.stringify(row)}} => {"user":{"name":"haokur"},"address":{"city":"guangzhou"}}
      </template>
    </Child>
  </div>
</template>
```

- 带值传递插槽的使用场景，在 element-ui 中使用的较多，当在非父组件中的循环时，而是向子组件传递值，子组件去遍历时，父组件中的插槽无法拿到遍历的当前值，需要子组件在遍历的时候，把值又给附加在 slot 上。

```js
// List.vue
<template>
  <ul class="table">
    <li class="row"
    v-for="(item,index) in dataList"
    :key="index">
      <slot :row="item">
        {{item}}
      </slot>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['dataList'],
}
</script>

/// parent.vue
<template>
  <div>
    <TestList :dataList="[1,2,3,4,5,6]">
      <template slot-scope="scope">
        {{ scope.row * 2 }}
      </template>
    </TestList>
  </div>
</template>
```

> 于是就实现了，子组件反向又像父组件传递值

##### 21. v-once 进行渲染优化，v-once 只会初始化一次，之后页面数据发生变化，v-once 内的内容也不会发生变化。

```html
<template>
  <div>
    <span v-once>{{dateNow}}</span>
    <span>{{dateNow}}</span>
  </div>
</template>
<script>
export default {
  data(){
    return {
      dateNow: Date.now()
	  }
  },
  mounted(){
    setInterval(() => {
      this.dateNow = Date.now()
    }, 1000)
  }
}
</script>
```

> 测试可看到只有没有加 v-once 的时间在变。

##### 22. 关于在 created 还是在 mounted 生命钩子里发送数据请求。有些说法是放在 created 中会好一些，可以避免多渲染一次？其论据可能是数据如果加载得快，那么就不render默认初始值，而是直接拿到获取到的数据，然后render？先给出我的结论，created 和 mounted 中基本无差，两者的渲染次数是一致的。

```html
<script>
export default {
  created(){
    this.name = 'hello';
    setTimeout(() => {
      this.name = 'haokur'
    }, 0)
  },
  mounted(){
    // this.name = 'xiao'
    //setTimeout(() => {
    //  this.name = 'haokur'
    //}, 0)
  }，
  render(h){
    console.log('执行渲染',this.name)
    return h('div',{},this.name)
	}
}
</script>
```

> 以上测试可知，**执行渲染** 将进行两次，也就是再快的数据返回，也是要进行两次 render 的。因为请求和setTimeout 一样都是异步的，所以它的执行结果是在事件队列中等着的，而 render 是当前执行栈中的同步方法，它是执行在事件队列中的方法之前的。
>
> 注释 created，放开mounted ，render 方法则会执行三遍。
>
> 但是 created 和 mounted 中直接赋值则是有差别的，因为 render 会发生在 mounted 之前一次。也就是初始化时，created =》render =》 mounted =》(若有更改，再次 render)  =》 请求返回 =》 再次 render
>
> 所以最佳的处理方式是，同步更改数据的，放 created 中，这样一些初值在第一次渲染就能正确呈现，且比在 mounted 中少执行一遍 render ，异步更改的无所谓。

##### 23. is 的使用，在一些特定的结构中使用组件，如 ul 下的 li

```html
// UserItem.js
<template>
	<li>this is useritem</li>
</template>

// container.js
<template>
	<ul>
    <li is="user-item"></li>
  </ul>
</template>
<script>
import UserItem from './UserItem.js'
export default {
	components:{
    'user-item':UserItem
  }
}
</script>
```

##### 24. Vue 双向数据绑定实现

##### 25. Proxy 实现

##### 26. 三大框架对比

##### 27. vue 的 functional 属性

## 二、Vue-Router 的使用

##### 1. 路由的简单使用

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './app.vue'
import Home from './home.vue'

Vue.use(VueRouter); // 注册 router-view，router-link 组件

new Vue({
  el:'#app',
  router:new VueRouter({
    routes:[
      path:'/home',
      component:Home
    ]
  }),
  render:h=>h(App)
})
```

> 以上仅是简单使用，在实际项目中，可以将 new VueRouter() 路由配置提出去，然后入口页引入。

```js
// router.config.js
export const RouterConf = new VueRouter({
  mode:'hash', // hash 默认，切换使用 # 模式，#/home; history 没有 # ，需要服务器配合；abstract 暂未知
  routes:[
     path:'/home',
     component:Home
  ]
})
// 以上还可以把 routes 的值数组单独提出去放一个文件

// main.js
import { RouterConf } from './router.config.js'
new Vue({
  router:RouterConf
})
```

##### 2. 路由守卫的使用

###### 全局路由守卫

- beforeEach，所有页面进入前，可以在这里做权限管理，保存滚动条位置，保存当前页面数据状态，调起显示页面加载动画等。

```js
// 接上面👆代码，router.config.js
import RouterConf from './router.config.js';

// to ,将要跳转的地址信息；now，现在的路由配置信息；next 执行跳转的方法，next(false)和没有next页面都将不跳转，可以 next('/login') 验证用户是否登录然后跳转登录，也可以 next(false) 阻止用户进入没有权限的页面。
RouterConf.beforeEach((to,now,next)=>{
  let token = localStorage.getItem('token')
  if(!token && to.name!=='login'){ // 防止路由登录页也一直跳转登录页
    next('/login')
  }
  else{
     next();
	}
})
```

- afterEach，所有页面进入后。可以做一些页面标题的设置，初始化回到顶部等

```js
import Vue from 'vue';

// 接上面👆代码，router.config.js
import RouterConf from './router.config.js';

// now 表示当前路由配置对象，from 表示上一个路由配置对象
RouterConf.afterEach((now,from)=>{
   document.title = now.meta.pageTitle;
	// 如果需要在页面渲染完之后处理一些事情
  Vue.nextTick(()=>{
    window.scroll(0,0);
  })
})
```

###### 组件路由守卫

- beforeRouteEnter(to,from,next)，组件加载进入时
- beforeRouteUpdate(to,from,next)，路由地址更新后执行，比如 #/home => #/home?a=1
- beforeRouteLeave(to,from,next)，可以通过 next(false) 阻止页面离开，比较好用，相见恨晚。

```html
<script>
// home.vue
export default {
  mounted(){
    console.log('home mounted')
  },
  beforeRouteUpdate(to,from,next){
    next();
	},
  beforeRouteEnter(to,from,next){
    next();
	},
  beforeRouteLeave(to,from,next){
    // 可以弹个窗提示，用户是否确认离开，确认才离开当前页面，更严谨一点，需要判断是往后退还是push新页面提交等等具体情况具体分析使用
    let confirmStatus = this.confirmStatus
    confirmStatus && next();
	},
}
</script>
```

> 切记beforeRouteUpdate，beforeRouteLeave，都需要手动调 next 才会进行下一步跳转。beforeRouteUpdate 暂未遇到什么使用场景。

- 番外，没有发现 beforeRouteLeave 时，页面返回需要确认时的处理逻辑。

1. 进入页面后，先用 pushState 在路由中添加一个记录，pushState 不会刷新页面用户无感知
2. 然后监听路由变化，即 window.addEventListener('hashchange',function(){ },false) ；
3. hashchange 回调中，判断是否需要弹窗提示
4. 在表单点击提交，不再需要保存当前页的数据时，先 history.go(-1) ，然后再移除hashchange 监听，再进行提交表单页面跳转等操作。 

##### 3. 路由组件使用

###### router-view 

定义路由容器，路由引起的变化的内容都将在这个容器之中，配合 keep-alive 使用可缓存页面。

```html
<template>
	<div id="app">
    <div>
    	不会随路由变化而变化的内容，可以存放一些全局使用内容，如提示信息等，通过使用 vuex 传递消息，或是 BusService 传递消息，使得内容显示或者隐藏以及具体显示内容
  	</div>
    <keep-alive :includes="['home','list']">
  		<router-view></router-view>
  	</keep-alive>
  </div>
</template>
```

###### router-link 

定义路由跳转，传入 to 属性，为一个对象，可以有 name(字符串)，path(字符串)，query(对象)，params(对象)

```html
<!-- 假如有配置路由 {
	name:'detail',
	path:'detail/:id'
} -->
<template>
  <router-link :to="{name:'detail',params:{id:1},query:{name:'xx'}}"></router-link> 
  <!-- 上面渲染出的链接： #/detail/1?name=xx -->
  <router-link :to="{path:'/detail',params:{id:1},query:{name:'xx'}}"></router-link>
  <!-- 上面渲染出的链接： #/detail?name=xx -->
  <router-link :to="{name:'detail',path:'/detail',params:{id:1},query:{name:'xx'}}"></router-link>
  <!-- 上面渲染出的链接： #/detail/1?name=xx -->
</template>
```

> 注意使用 name 时，vue 将根据路由配置找到对应的 name，然后还原出 path，这时候如果路由配置的 path 是 '/detail/:id' 类似的形式，则将按这规则，还原完整的地址。
>
> 也就是当有 path 时，只照顾 query 参数。
>
> 有 name 时，对应路由配置信息找出 path，然后用 params 填充 path，再拼上 query
>
> name 和 path 共存时，按 name 的规则走。(尽量避免)

##### 4. 路由方法的使用，$router & $route

###### $router，常用的以下几个方法

- push，参数可以是字符串，表示要跳转的地址，或者一个对象，类似 router-link 的 to 的值
- replace，替换一个地址，参数和 push 同
- back，回退上一个页面
- go，回退或前进 n 个页面

```js
export default {
  mounted(){
    this.$router.push('/detail/1'); // 直接字符串形式
    this.$router.push({
      name:'detail',
      query:{a:1},
      params:{id:1}
    })； // 使用规则和 router-link 类似
    // this.replace 类似 push
    this.$router.back()
    this.$router.go(-2) // 后退
    this.$router.go(2) // 前进
  }
}
```

###### $route，路由参数信息对象(响应式)

组件中获取路由参数，通过 this.$route 获取

- params，对应路由中的 'detail/:id' 配置，路由为 #detail/1 , 则 this.$route.params.id 为 1；
- query，对应路由中的 ？后的值，如路由为 #detail/1?name=xx，则 this.$route.query.name 为 xx;

```js
// 可以在 created 周期内获取
export default {
  data(){
    return {
      id:'',
      name:''
    }
  }
  created(){
    let { id } = this.$route.params;
    let { name } = this.$route.query;
    this.id = id || ''
    this.name = name || ''
  }
}
```

##### 5. 路由懒加载配置

> 以前使用 require.ensure 实现路由懒加载，现在可以直接 ()=>import 实现了

```js
// router.config.js
export const RouterConf = [
  {
    path:'/home',
    component:()=> import(/* webpackChunkName: "home" */ './home.js')
  }
]
```

打包时，将以 home 命名。







## 示例代码

整理完之后，将发布在 github 上
[https://github.com/haokur/](https://github.com/haokur/)