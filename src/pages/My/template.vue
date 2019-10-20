<template>
    <div id="user">
        <!-- 我的页面 -->
        <section class="user-info">
            <img :src="user.avatar" :alt="user.username" class="avatar">
            <h3>{{user.username}}</h3>
        </section>
        <section>
            <router-link class="item" v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`">
               <div class="date">
                    <span class="day">{{splitDate(blog.createdAt).date}}</span>
                    <span class="mouth">{{splitDate(blog.createdAt).month}}月</span>
                    <span class="year">{{splitDate(blog.createdAt).year}}</span>   
                </div>
                <h3>{{blog.title}}</h3>  
                <p>{{blog.description}}</p>
                <div class="actions">
                    <router-link :to="`/edit/${blog.id}`">编辑</router-link>
                    <a href="#" @click.prevent="onDelete(blog.id)">删除</a>
                </div>
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
import blog from '@/api/blog'
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            blog: [],
            page: 1,
            total: 0
        }
    },

    computed: {
        ...mapGetters(['user'])
    },

    created(){
        this.page = parseInt(this.$route.query.page) || 1
        blog.getBlogsByUserId(this.user.id, { page: this.page })
            .then(res =>{
                this.page = res.page
                this.total = res.total
                this.blogs = res.data
            })
    },
    methods: {
        onPageChange(newPage){
            blog.getBlogsByUserId(this.user.id, { page: newPage }).then(res =>{
            this.blogs = res.data
            this.total = res.total
            this.page = res.page    
            this.$router.push({ path: "/my", query: { page: newPage}})
            })
    },
        async onDelete(blogId){
            await this.$confirm('此操作将永久删除该文件,是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })

            await blog.deleteBlog({ blogId })
            this.$message.success('删除成功')
            this.blogs = this.blogs.filter(blog => blog.id != blogId)
        },

        splitDate(dataStr){
            let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
            return {
                date: dateObj.getDate(),
                mouth: dateObj.getMouth() + 1,
                year: dateObj.getFullYear()
            }
        }
    }
}
</script>

<style src="./template.less" lang="less"></style>
