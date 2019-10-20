<template>
    <div id="edit">
    <!-- 编辑博客 -->
        <h1>编辑文章</h1>
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
            </el-switch></p>
            <el-button @click="onEdit">确定</el-button>
    </div>
</template>

<script>
import blog from '@/api/blog'

export default {
    data(){
        return {
            blogId: null,
            title: '',
            description: '',
            content: '',
            atIndex: false
        }
    },

    created() {
        this.blogId = this.$route.params.blogId
        blog.getDetail({ blogId: this.blogId }).then(res => {
            this.title = res.data.title
            this.description = res.data.description
            this.content = res.data.content
            this.atIndex = res.data.atIndex
        })
    },

    methods: {
        onEdit(){
            blog.updateBlog({ blogId: this.blogId }, { title: this.title, content: this.content, description: this.description, atIndex: this.atIndex })
                .then(res => {
                    this.$message.success(res.msg)
                    this.$router.push({ path: `/detail/${res.data.id}`})
                })
        }
    }
}
</script>

<style src="./template.less" lang="less"></style>
