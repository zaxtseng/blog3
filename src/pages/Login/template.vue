<template>
    <div id="login">
    <!-- 登录页面 -->
    <h4>用户名</h4>
    <el-input v-model="username" placeholder="用户名"></el-input>
    <h4>密码</h4>
    <el-input v-model="password" placeholder="密码" type="password" @keyup.enter="onLogin"></el-input>
    <el-button size="medium" @click="onLogin">立即登录</el-button>
    <p class="notice">没有账号?<router-link to="/register">注册新用户</router-link></p>
    </div>
</template>

<script src="./template.js"></script>

<style src="./template.less" lang="less"></style>
