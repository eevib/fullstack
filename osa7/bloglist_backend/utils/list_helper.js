const blog = require("../models/blog")
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const likes = blogs.reduce(function(sum, blog) {
        return sum + blog.likes
    }, 0)
    return likes
}
const favoriteBlog = (blogs) => {
    if(blogs === undefined) {
        return null
    }
    const mostLikes = (previous, blog) => {
        return previous.likes > blog.likes ? previous : blog
    }
    const favorite =  blogs.reduce(mostLikes)
    return  favorite || null

}
const mostBlogs = (blogs) => {
    const authors = _.countBy(blogs, 'author')
    const blogsByAuthor = _.map(authors, (value, key) => ({ author:key, blogs:value }))
    
    return  _.maxBy(blogsByAuthor, 'blogs') || null
}
const mostLikes = (blogs) => {
    const authors = _.groupBy(blogs, 'author')

    const likesSum = (listOfBLogs) => {
        return _.sumBy(listOfBLogs, 'likes')
    }
    const likes = _.map(authors, (value, key) => ({ author:key, likes:likesSum(value)}))
    
    return _.maxBy(likes, 'likes') || null
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes 
}