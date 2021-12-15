const { result } = require('lodash')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithManyBlogs = helper.initialBlogs
    
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }
  ]
  const listWithManyBlogs = helper.initialBlogs
  test('empty list returns null', () => {
    const result = listHelper.favoriteBlog()
    expect(result).toEqual(null)
  })
    
  test('when list has one blog, the one is returned', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    })
  })
  test('is found from list with many blogs', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    })
  }) 
  describe('most blogs by author', () => {
    const listWithOneBlog = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      }
    ]
    const listWithManyBlogs = helper.initialBlogs
    test('emptylist return null', () => {
      const result = listHelper.mostBlogs()
      expect(result).toEqual(null)
    })

    test('list with one blog returns author and 1', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        blogs: 1
      })
    })
    test('list with many blogs returns author with most blogs', () => {
      const result = listHelper.mostBlogs(listWithManyBlogs)
      expect(result).toEqual({
        author: "Robert C. Martin",
        blogs: 3
      })
    })
  })
  describe('most likes for author', () => {
    const listWithOneBlog = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      }
    ]
    const listWithManyBlogs = helper.initialBlogs

    test('list with one blog returns author and likes', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 5
      })
    })
    test('list with many blogs retuns right author and sum of likes', () => {
      const result = listHelper.mostLikes(listWithManyBlogs)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17
      })
    })
    test('empty list returns null', () => {
      const result = listHelper.mostLikes()
      expect(result).toEqual(null)
    }) 
      
  })
})