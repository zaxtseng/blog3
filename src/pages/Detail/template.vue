<template>
    <div id="detail">
        <section class="user-info">
            <img :src="user.avatar" :alt="user.username" :title="user.username"> calss="avatar">
            <h3>{{title}}</h3>
            <p><router-link :to="`/user/${user.id}`">{{user.username}}</router-link>发布于{{friendlyDate(creatAt)}}</p>
        </section>
        <section class="article" v-html="markdown"></section>
    </div>
</template>

<script>
import marked from 'marked'
import blog from '@/api/blog'


export default {
    data(){
        return {
            title: '',//标题
            rawContent: '',//转换
            user: {},//用户信息
            createdAt: '' //创建时间
        }
    },

    created(){
        this.blogId = this.$route.params.blogId
        blog.getDetail({ blogId: this.blogId}).then(res => {
            this.title = res.data.title
            this.rawContent = res.data.content
            this.createdAt = res.data.createdAt
            this.user = res.data.user
        })
    },

    computed: {
        markdown(){
            return marked(this.rawContent)
        }
    }
}
</script>

<style src="./template.less" lang="less"></style>