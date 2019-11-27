# blog3
# 前后端接口约定
## 后端接口规范

1. 当前接口路径
2. 当前接口提交数据类型,如:

GET: 获取数据

POST: 提交或者创建

PUT: 修改数据

DELETE: 删除数据

PATCH: 修改数据,部分修改

3. 参数类型格式: json或者application/x-www-form-urlencoded的数据
4. 参数字段及限制条件
5. 返回成功的数据格式
6. 返回失败的数据格式

下面和后端做以下接口约定,开发阶段使用postman或者curl命令测试接口

认证相关

### POST /auth/register

功能: 用户注册

提交参数

参数类型: Content-type: application/x-www-form-urlencoded;chratset=utf-8

参数字段:

username: 用户名,长度1-15个字符,只能是字母数字下划线

password: 密码,长度6-16位任意字符

返回数据

失败: 

返回格式: `{"status": "fail", "msg": "错误原因"}`

成功:

返回格式:
```js
{
    "status": "ok",
    "msg": "注册成功",
    "data":  {
        "id" : 1,
        "username": "Tom",
        "avatar": "http://avatar.com/1.png",
        "createdAt": "2019-10-19T15:15:33.343Z",
        "updatedAt": "2019-10-19T15:15:33.343Z"
    }
}
```
测试命令

`# -d用来传递数据`

`# 对于POST和PUT可以: -X POST,对于GET,不加-X`

`curl -d "usernme=Tom&password=123456" -X POST "http://localhost:3000/auth/regitster"`


### GET /auth/login

功能: 用户登录

提交参数

参数类型: Content-type: application/x-www-form-urlencoded;chratset=utf-8

参数字段: 

    username: 用户名,长度1-15个字符,只能是字母数字下划线
    password: 密码,长度6-16位任意字符

返回数据

失败: 

    返回格式: `{"status": "fail", "msg": "用户不存在"}或者 {"status": "fail", "msg": "密码不正确"}`

成功:

返回格式:
```js
{
    "status": "ok",
    "msg": "注册成功",
    "data":  {
        "id" : 1,
        "username": "Tom",
        "avatar": "http://avatar.com/1.png",
        "createdAt": "2019-10-19T15:15:33.343Z",
        "updatedAt": "2019-10-19T15:15:33.343Z"
    }
}
```

测试命令

`# -d用来传递数据`

`# -i 可以显示响应头`

`# 会发现响应头里有setCookie信息,得到cookie`

`curl -d "usernme=Tom&password=123456"  "http://localhost:3000/auth/login" -i`


### GET /auth
功能: 判断用户是否登录

提交参数: 无

返回数据: 
已经登录的情况

返回格式:
```js
{
    "status": "ok",
    "isLogin": "true",
    "data":  {
        "id" : 1,
        "username": "Tom",
        "createdAt": "2019-10-19T15:15:33.343Z",
        "updatedAt": "2019-10-19T15:15:33.343Z"
    }
}
```

没有登录的情况
```
{
"status": "ok"
"isLogin": false
}
```

测试命令

`#先通过登录接口获取 cookie，带上 cookie 就能测试登录`

`curl "http://localhost:3000/auth" -b "connect.sid=s%3AmeDbrn03UtTM8fqChaPQ20wmWlnKeHiu.e3uMtu7j1zQ1iNeaajCmxkYYGQ%2FyHV1ZsozMvZYWC6s"`

### GET /auth/logout
功能: 注销登录

提交参数:无

返回数据: 

    失败:
    返回格式: `{ "status": "fail", "msg": "用户尚未登录"}`

    成功:
    返回格式: `{ "status": "success", "msg": "注销成功"}`

测试命令

`curl "http://localhost:3000/auth/logout" -b "connect.sid=s%3AmeDbrn03UtTM8fqChaPQ20wmWlnKeHiu.e3uMtu7j1zQ1iNeaajCmxkYYGQ%2FyHV11ZsozMvZYWC6s"`


# 博客相关

### GET /blog
功能: 获取博客列表

提交参数:

    page: 页码,不传默认为1.
    userId: 用户ID,不传获取全部用户ID
    atIndex: 是否展示在首页.true只得到展示到首页的博客列表,false得到不展示到首页的列表,不传得到全部类型的博客列表

如 /blog?page=2&userId=1 获取属于用户1的第二页博客列表

返回数据: 

    失败: { "status": "系统异常"}
成功: 
返回格式:
```js
{
    "status": "ok",
    "msg": "获取成功",
    "total": 200,//全部博客总数
    "page": 2,//当前页数
    "totalPage": 10, //总页数
    "data": {
        "id": 1,
        "title": "博客标题",
        "description": "博客内容简要描述",
        "user": {
            "id": 100, //博客所属用户id
            "username": "博客所属用户username",
            "avatar": "头像"
        },
        "createdAt": "2019-10-19T15:15:33.343Z", //创建时间
        "updatedAt": "2019-10-19T15:15:33.343Z", //更新时间
    }
}
```

测试命令

`curl "http://localhost:3000/blog?page=1&userId=1"`

`curl "http://localhost:3000/blog?page=1"`

`curl "http://localhost:3000/blog"`

### GET /blog/:blogId
功能: 获取id为blogId的博客详情,如 /blog/1

提交参数: 无

返回数据: 
    失败: `{ "status": "fail", "msg": "系统异常"}`

成功: 

返回格式:
```js
{
"status": "ok",
"msg": "获取成功",
"data": {
    "id": 1,
    "title": "博客标题",
    "description": "博客内容简要描述",
    "content": "博客内容",
    "user": {
        "id": 100, //博客所属用户id
        "username": "博客所属用户username",
        "avatar": "头像"
    },
    "createdAt": "2019-10-19T15:15:33.343Z", //创建时间
    "updatedAt": "2019-10-19T15:15:33.343Z", //更新时间
}
}
```

### POST /blog
功能: 创建博客

提交参数:

    参数类型: Content-type: application/x-www-form-urlencoded; charset=utf-8;
    参数字段:
        title : 博客标题, 博客标题不能为空，且不超过100个字符
        content : 博客内容, 博客内容不能为空，且不超过10000个字符
        description: 博客内容简要描述,可为空，如果为空则后台自动从content 中提取

返回数据: 

    失败: { "status": "fail", "msg": "登录后才能操作"}
成功: 

返回格式:
```j
{
"status": "ok",
"msg": 创建成功",
"data": {
    "id": 1,
    "title": "博客标题",
    "description": "博客内容简要描述",
    "content": "博客内容",
    "user": {
        "id": 100, //博客所属用户id
        "username": "博客所属用户username",
        "avatar": "头像"
    },
    "createdAt": "2019-10-19T15:15:33.343Z", //创建时间
    "updatedAt": "2019-10-19T15:15:33.343Z", //更新时间
}
}
```

测试命令
`curl -d "title=hello&content=world&description=jirengu" -X POST "http://localhost:3000/blog" -b "connect.sid=s%3AdyZh-z5fqPU_ThG9Qn8nGD6euI0UI75e.8uso0k4P6WzqWv02iQCUwxbUML2RdlOCnpKp7RSJpj0"`

### PATCH /blog/:blogid
功能: 修改博客id为:blogid的博客

范例: /blog/1

提交参数

参数类型: Content-Type: application/x-www-form-urlencoded; charset=utf-8

参数字段:

        title: 博客标题
        content : 博客内容, 博客内容不能为空，且不超过10000个字符
        description: 博客内容简要描述,可为空，如果为空则后台自动从content 中提取
        atIndex: true/false， 展示到首页/从首页异常, 可选

返回数据

失败

返回格式:

```js
{"status": "fail", "msg": "登录后才能操作"}
{"status": "fail", "msg": "博客不存在"}
{"status": "fail", "msg": "无法修改别人的博客"}
```
成功

返回格式:
```
{
"status": "ok",
"msg": 修改成功",
"data": {
    "id": 1,
    "title": "博客标题",
    "description": "博客内容简要描述",
    "content": "博客内容",
    "user": {
        "id": 100, //博客所属用户id
        "username": "博客所属用户username",
        "avatar": "头像"
    },
    "createdAt": "2019-10-19T15:15:33.343Z", //创建时间
    "updatedAt": "2019-10-19T15:15:33.343Z", //更新时间
}
}
```

测试命令

`curl -d "title=hello100&content=world1&description=jirengu2234444444&atIndex=true" -X PATCH "http://localhost:3000/blog/12" -b "connect.sid=s%3At_9V2bMXA7U9oSAmr1dhRXpdRPAsNM2B.jlpWgkwiWdpgTjexeTHGNydt8gvc%2F%2BEkJpQ9yaAmTg0"`

### DELETE /bog/:blogid

功能: 删除id为:blogid的博客

提交参数：无

返回数据

失败

返回格式范例
```js
{"status": "fail", "msg": "登录后才能操作"}
{"status": "fail", "msg": "博客不存在"}
{"status": "fail", "msg": "无法删除别人的博客"}
```
成功

返回格式
```js
{
"status": "ok",
"msg": "删除成功"
}
```
测试命令

`curl -X DELETE "http://localhost:3000/blog/12" -b "connect.sid=s%3AG_Chytg2F0RLWh2wTSCdLWVxpNg1MWWb.nPuMcgyMN6zxuxjSkyu8qSqM1boruol1Nce7egaXrPw"`

# 文件介绍

## main.js
项目入口
```js
import Vue,app,router from ...
new Vue({
    el:"#app",
    router,
    component: { App },
    template: '<App />
})
```
## App.vue
当前整个项目的模板

`tempalte,js,style`

## component/xxx.vue
各个组件,也可以同名的文件夹,包含vue,css,js

## router.js
路由组件
# 请求接口封装
## helpers/request.js
请求组件

import axios

//约定请求文件格式

`axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'`

//接口路径

`axios.defaults.baseURL = 'http://blog-server.hunger-valley.com'`

//前后端分离,即使异步请求也带上cookie

`axios.defaults.withCredentials = true`

//函数导出

`export default function request(){
    ...
}`
## api接口封装

### @/api/auth.js

//引入请求接口

`import request from '@/helpers/request'`

把各个接口进行封装,便于后续调用
```js
const URL = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GET_INFO: '/auth'
}

export default {
    register({username, password}){
        return request(URL.REGISTER, 'POST', { username, password })
    },
    login({ username, password}){
        return request(URL.LOGIN, 'POST', { username, password })
    },
    logout(){
        return request(URL.LOGOUT)
    },
    getInfo(){
        return request(URL.GET_INFO)
    }
}
```
## 封装blog接口
同样引入请求接口
`import request from '@/helpers/request'`

封装blog的各个接口
```js
const URL = {
    GET_LIST: '/blog',
    GET_DETAIL: '/blog/:blogId',
    CREATE: '/blog',
    UPDATE: '/blog/:blogId',
    DELETE: '/blog/:blogId'
}
export default {
    getBlogs({ page=1, userId, atIndex } = { page:1 }){
        return request(URL.GET_LIST, 'GET', { page, userId, atIndex })
    },
    getIndexBlogs({ page=1 } = { page: 1 }){
        return this.getBlogs({ userId, page, atIndex })
    }
    getDetail({ blogId }){
        return  reuqest(URL.GET_DETAIL, replace(':blogId', blogId))
    },
    updateBlog({ blogId }, { title, content, description, atIndex }){
        return request(URL.UPDATE, replace(':blogId', blogId), 'PATCH', { title, content, description, atIndex })
    },
    deleteBlog({ blogId }){
        return request(URL.DELETE, replace(':blogId',blogId), 'DELETE')
    },
    createBlog({ title = '', content = '', description = '',atIndex = false } = { title = '', content = ''}){
        return request(URL.CREATE, 'POST', { title, content, description })
    }
}
```

# 首页布局
...

# 状态管理
store.js
```js
// @/assets/moudles/auth.js
const state = {
    user: null,
    isLogin: false
}

const getters = {
    user:state => state.user,
    isLogin:state => state.isLogin
}

const mutations = {
    setUser(state, payload){
        state.user = payloag.user
    },
    setLogin(state, payload){
        state.isLogin = payload.isLogin
    }
}

const actions = {
    async login({ commit }, { username, password }){
        let res = await auth.login({ username, password })
        commit('setUser', { user: res.data})
        commit('setLogin', { isLogin: true })
        return res.data
    },
    async register({ commit }, { username, password }){
        let res = await auth.register({ username, password})
        commit('setUser', { user: res.data})
        commit('setLogin', { isLogin: true })
        return res.data
    },
    async logout({ commit }){
        await auth.logout()
        commit('setUser', { user: null })
        commit('setLogin', { isLogin: false })
    },
    async checkLogin({ commit, state }){
        //判断state中是否有登录状态,有返回true
        if(state.isLogin) return true
        //如果state中没有,调用res
        let res = await auth.getInfo()
        //从res中获取isLogin状态设置Login
        commit('setLogin', { isLogin: res.isLogin }) 
        //如果res中未登录,返回false
        if(!res.isLogin) return false
        //如果res中已登录,设置user并返回true
        commit('setUser', { user: res.data })
        return true
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
```
# 在header.vue中调用vuex中的参数
```js
//header.vue
import { mapState, mapActions } from 'vuex'

export default {
    data(){
        return {}
    },
    computed(){
        ...mapGetters([
            'isLogin',
            'user'
        ])
    },
    created(){
        //在生命周期created调用methods的方法
        this.checkLogin()
    },

    methods: {
        //将state中的方法映射进来
        ...mapActions({
            'checkLogin'
        })
    }
}
```
# 登录和注册
```js
// Login/template.vue
<template>
    <div id="login">
        <h4>用户名</h4>
        <input v-model="username" placeholder="用户名">
        <h4>密码</h4>
        <input v-model="password" type="password" placeholder="密码" @key.enter="onLogin">
        <el-button size="medium" @click="onLogin">立即登录</el-button>
        <p class="notice">没有账号?<router-link to="/register">注册新用户</router-link></p>
    </div>
</template>
```
```js
//Login/template.js
import { mapActions } from 'vuex'

export default {
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        //把login从vuex中拿出来
        ...mapActions(['login'])

        onLogin(){
            //test
            console.log(this.username + this.password)
            //执行登录,把用户名密码传递
            this.login({username: this.username, password: this.password})
            //调用then下一步操作,跳转到首页或者定向页面
                .then(() => {
                    this.$router.push({path: this.$route.query.redirect || '/'})
                })
        }
    }
}
```
## 注册
注册类似于登录
将login换成register即可.

# 路由组件router.js
```js
import Vue from 'vue'
import Router from 'vue-router'

//引入store为了checkin
import store from './src/store.js'

Vue.use(Router)

//先声明,最后再导出
const router =  new Router({
  routes: [
    {
      path: '/',
      //使用匿名函数import方式实现异步懒加载
      //当需要跳转该模块时才会引入相关路径
      component: () => import('@/pages/Index/template.vue')
    },
    {
      path: '/login',
      component: () => import('@/pages/Login/template.vue')
    },
    {
      path: '/detail/:blogId',
      component: () => import('@/pages/Detail/template.vue')
    },
    {
      path: '/edit/:blogId',
      component: () => import('@/pages/Edit/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      component: () => import('@/pages/Create/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:userId',
      component: () => import('@/pages/User/template.vue')
    },
    {
      path: '/my',
      component: () => import('@/pages/My/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      component: () => import('@/pages/Register/template.vue')
    }
  ]
})

router.beforeEach((to,from,next) => {
    //判断是否有元信息meta
    if(to.matched.some(record => record.meta.requiresAuth)){
        //如果有就触发checkLogin检查登录状态
        store.dispatch('checkLogin').then(isLogin => {
            if(!isLogin){
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            }else{
                next()
            }
        })
    }else{
        next()
    }
})

export default router

```

# 创建博客页面
```js
<template>
    <div id="edit">
    <!-- 创建博客 -->
        <h1>创建文章</h1>
        <h3>文章标题</h3>
        <el-input v-model="title"></el-input>
        <p class="msg">限30个字</p>
        <h3>内容简介</h3>
        <el-input type="textarea" v-model="description" :autosize="{ minRow: 2, maxRows: 4 }"></el-input>
        <p class="msg">限30个字</p>
        <h3>文章内容</h3>
        <el-input type="textarea" v-model="content" :autosize="{ minRow: 4, maxRows: 30 }"></el-input>
        <p class="msg">限30个字</p>
        <p>
            <label>是否展示到首页</label>
            <el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#fff">
            </el-switch>
        </p>
            <el-button @click="onCreate">确定</el-button>
    </div>
</template>

<script>
import blog from '@/api/blog'

export default {
    data(){
        return {
            title: '',
            description: '',
            content: '',
            atIndex: false
        }
    },
    methods: {
        onCreate(){
            blog.createBlog({ title: this.title, content: this.content, description: this.description, atIndex: this.atIndex})
                .then(res => {
                    this.$message.success(res.msg)
                    this.$router.push({ path: `/detail/${res.data.id}`})
                })
        }
    }
}

</script>
```
# 完善首页



# 详情页



# 时间插件
```js
function friendlyDate(datsStr){
    let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
    let time = dateObj.getTime()
    let now = Date.now()
    let space = now - time
    let str = ''
    
    switch(true){
        case space < 60000:
            str = '刚刚'
            break
        case space < 1000*3600:
            str = Math.floor(space/60000) + '分钟前'
            break
        case space < 1000*3600*24:
            str = Math.floor(space/(1000*3600)) + '小时前'
            break
        default:
            str = Math.floor(space/(1000*3600*24)) + '天前'
    }
    return str
}

export default {
    install(Vue, options) {
        Vue.prototype.friendlyDate = friendlyDate
    }
}
```


# 个人页面user

有点东西

# 登陆者的个人页面my





# 遇到过的问题
1. vuex中actions错误(原因: modules拼错了)
2. 登录时enter无法使用.(解决方法: 加.native)
3. 文章内容应有一定区域(原因: 没写palceholder)
4. 编辑时少一个设置为首页的按钮(原因:按钮初始颜色透明)
5. my页面无法显示(原因: 因为错误6)
6. 过滤器getMouth错误,(原因: mouth单词拼错)
7. my页面编辑删除两个按钮靠的太近
8. header布局错误(原因: h1标签没有把router-link包裹,如果包裹,less有设置h1下a标签的颜色为白色.
没有包裹的时候,a标签的颜色是common.less设置的黑色,会覆盖)
标题颜色错误,把标题文本和普通文本颜色算在一起了.

