<template>
    <div id="register">
    <!-- 登录页面 -->
    <h4>用户名</h4>
    <el-input v-model="username" placeholder="用户名"></el-input>
    <h4>密码</h4>
    <el-input v-model="password" placeholder="密码" type="password" @keyup.enter="onRegister"></el-input>
    <el-button size="medium" @click="onRegister">立即注册</el-button>
    <p class="notice">已有账号?<router-link to="/login">立刻登录</router-link></p>
    </div>
</template>

<script src="./template.js"></script>

<style src="../Login/template.less" lang="less"></style>
