import request from "@/helpers/request"

export default {
    getBlogs({page = 1, userId, atInex} = {page: 1}){
        return request(URL.GET_LIST, 'GET', {page, userId, atIndex})
    },
    getIndexBlogs({page=1} = {page: 1}){
        return this.getBlogs({page, atIndex: true})
    },
    getBlogsByUserId(userId, {page=1, atIndex}  = {page: 1}){
        return this.getBlogs({userId, page, atIndex})
    },
    getDetail({blogId}){
        return request(URL.GET_DETAIL,replace(':blodId', blodId))
    },
    updateBlog({blogId}, {tilte, content, description, atIndex}){
        return request(URL.UPDATE.replace(':blogId', blogId), 'PATCH', {title, content, description, atIndex})
    },
    deteleBlog({blogId}){
        return request(URL.DELETE.replace(':blogId', blogId), 'DELETE')
    },
    createBlog({tilte = '', content = '', description = ''} = {title: '', content: '', description = ''}){
        return request(URL.CREATE, 'POST', {title, content, description})
    }
}