<template>
    <div id="index">
        <!-- 首页 -->
        <section class="blog-posts">
            <router-link class="item" v-for="blog in blogs" :to="`/detail/${blog.id}`">
                <figure class="avatar">
                    <img :src="blog.user.avatar" :alt="blog.user.username">
                    <figcaption>{{blog.user.username}}</figcaption>
                </figure>
                <h3>{{blog.title}}<span> {{friendlyDate(blog.createdAt)}}</span></h3>
                <p>{{blog.description}}</p>
            </router-link>
        </section>
        <section class="pagination">    
            <el-pagination 
            layout="prev, pager, next" 
            :total="total" 
            :current-page="page"
            @current-change="onPageChange">
            </el-pagination>
        </section>
    </div>
</template>

<script>
import blog from '@/api/blog.js'

export default {
    data(){
        return {
            blogs: [],
            total: 0,
            page: 1 
        }
    },

    created(){
        this.page = parseInt(this.$route.query.page) || 1
        blog.getIndexBlogs({ page: this.page }).then(res => {
            this.blogs = res.data
            this.total = res.total
            this.page = res.page
        })
    },

    methods: {
        onPageChange(newPage){
            blog.getIndexBlogs({ page: newPage}).then(res =>{
            this.blogs = res.data
            this.total = res.total
            this.page = res.page    
            this.$router.push({ path: '/', query: { page: newPage}})
            })
        }
    }
}
</script>

<style lang="less" src="./template.less"></style>
