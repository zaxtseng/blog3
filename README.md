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

#### POST /auth/register

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

测试命令

`# -d用来传递数据`

`# 对于POST和PUT可以: -X POST,对于GET,不加-X`

`curl -d "usernme=Tom&password=123456" -X POST "http://localhost:3000/auth/regitster"`


#### GET /auth/login

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
`{
    "status": "ok",
    "msg": "注册成功",
    "data":  {
        "id" : 1,
        "username": "Tom",
        "avatar": "http://avatar.com/1.png",
        "createdAt": "2019-10-19T15:15:33.343Z",
        "updatedAt": "2019-10-19T15:15:33.343Z"
    }
}`

测试命令

`# -d用来传递数据`

`# -i 可以显示响应头`

`# 会发现响应头里有setCookie信息,得到cookie`

`curl -d "usernme=Tom&password=123456"  "http://localhost:3000/auth/login" -i`


#### GET /auth
功能: 判断用户是否登录

提交参数: 无

返回数据: 
已经登录的情况

返回格式:
`{
    "status": "ok",
    "isLogin": "true",
    "data":  {
        "id" : 1,
        "username": "Tom",
        "createdAt": "2019-10-19T15:15:33.343Z",
        "updatedAt": "2019-10-19T15:15:33.343Z"
    }
}`

没有登录的情况
`{
  "status": "ok"
  "isLogin": false
}`

测试命令

`#先通过登录接口获取 cookie，带上 cookie 就能测试登录`

`curl "http://localhost:3000/auth" -b "connect.sid=s%3AmeDbrn03UtTM8fqChaPQ20wmWlnKeHiu.e3uMtu7j1zQ1iNeaajCmxkYYGQ%2FyHV1ZsozMvZYWC6s"`

#### GET /auth/logout
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

#### GET /blog
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
`{
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
}`

测试命令

`curl "http://localhost:3000/blog?page=1&userId=1"`

`curl "http://localhost:3000/blog?page=1"`

`curl "http://localhost:3000/blog"`

#### GET /blog/:blogId
功能: 获取id为blogId的博客详情,如 /blog/1

提交参数: 无

返回数据: 
    失败: `{ "status": "fail", "msg": "系统异常"}`

    成功: 

        返回格式:
`{
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
}`

#### POST /blog
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
`{
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
}`

测试命令
`curl -d "title=hello&content=world&description=jirengu" -X POST "http://localhost:3000/blog" -b "connect.sid=s%3AdyZh-z5fqPU_ThG9Qn8nGD6euI0UI75e.8uso0k4P6WzqWv02iQCUwxbUML2RdlOCnpKp7RSJpj0"`

#### PATCH /blog/:blogid
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

            {"status": "fail", "msg": "登录后才能操作"}

            {"status": "fail", "msg": "博客不存在"}

            {"status": "fail", "msg": "无法修改别人的博客"}
        成功

        返回格式:

`{
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
}`

测试命令

`curl -d "title=hello100&content=world1&description=jirengu2234444444&atIndex=true" -X PATCH "http://localhost:3000/blog/12" -b "connect.sid=s%3At_9V2bMXA7U9oSAmr1dhRXpdRPAsNM2B.jlpWgkwiWdpgTjexeTHGNydt8gvc%2F%2BEkJpQ9yaAmTg0"`

#### DELETE /bog/:blogid

功能: 删除id为:blogid的博客

提交参数：无

返回数据

失败

返回格式范例

`{"status": "fail", "msg": "登录后才能操作"}`

`{"status": "fail", "msg": "博客不存在"}`

`{"status": "fail", "msg": "无法删除别人的博客"}`

成功

返回格式

`{
"status": "ok",
"msg": "删除成功"
}`
测试命令

`curl -X DELETE "http://localhost:3000/blog/12" -b "connect.sid=s%3AG_Chytg2F0RLWh2wTSCdLWVxpNg1MWWb.nPuMcgyMN6zxuxjSkyu8qSqM1boruol1Nce7egaXrPw"`

# 文件介绍

## main.js
    项目入口

`    import Vue,app,router from ...
    new Vue({
        el:"#app",
        router,
        component: { App },
        template: '<App />
    })`

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

@/api/auth.js

//引入请求接口

`import request from '@/helpers/request'`

把各个接口进行封装,便于后续调用



