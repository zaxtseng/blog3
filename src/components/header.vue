<template>
  <header :class="{'login': isLogin, 'no-login': !isLogin}">
    <template v-if="!isLogin">
      <h1>Just do it</h1>
    <p>精品博客</p>
    <div class="btns">
      <el-button><router:link>立即登录</router:link></el-button>
      <el-button><router:link>注册账号</router:link></el-button>
    </div>
    </template>
    <template v-if="isLogin">
      <router-link to="/"><h1>Just do it</h1></router-link>
      <router-link to="/create"><i class="edit el-icon-plus"></i></router-link>
      
      <div class="user">
        <img class="avatar" :src="user.avatar" :alt="user.username">
      <ul>
        <li><router-link to="/my">我的</router-link></li>
        <li><a href="#" @click="onLogout">注销</a></li>
      </ul>
      </div>
    </template>
  </header>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  data(){
    return {
      isLogin: true
    }
  },

  computed: {
    ...mapGetters([
      'isLogin',
      'user'
    ])
  },

  created(){
    this.checkLogin()
  },

  methods: {
    ...mapActions([
      'checkLogin',
      'logout'
    ]),

    onLogout(){
      this.logout()
    }
  }

}
</script>

<style lang="less">
@import "../assets/base.less";

header .login {
  padding: 0 12% 30px 12%;
  background-color: @bgColor;
  display: grid;
  justify-items: center;

h1 {
  font-size: 40px;
  margin: 60px 0 0 0;
  text-transform: uppercase;
  color: #fff;
}

p {
  margin: 15px 0 0 0;
  color: #fff;
}

.btns {
  margin-top: 20px;
}
button {
  margin: 20px 5px 0;
}

}

header .no-login {
  display: flex;
  align-items: center;
  background-color: @bgColor;

  h1 {
    margin: 0;
    padding: 0;
    font-size: 40px;
    text-transform: uppercase;
    flex: 1;
    
  a {
    color: #fff;
  }

  }

  .edit {
    color: #fff;
    font-size: 30px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 15px;
  }
}

.user {
  position: relative;

  ul {
    display: none;
    position: absolute;
    right: 0;
    list-style: none;
    border: 1px solid #eaeaea;
    margin: 0;
    padding: 0;
    background-color: #fff;

    a{
      text-decoration: none;
      color: #333;
      font-size: 12px;
      display: block;
      padding: 5px 10px;

      &:hover ul {
        display: block;
      }
    }

  }
}
</style>
