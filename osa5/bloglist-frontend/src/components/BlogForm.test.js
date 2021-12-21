import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('adding a blog', () => {

  test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const testUser = {
      username: 'testUser',
      password: 'secret'
    }
    const createBlog = jest.fn()
    const component = render(
      <BlogForm createBlog={createBlog} user={testUser} />
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testTitle' }
    })
    fireEvent.change(author, {
      target: { value: 'testAuthor' }
    })
    fireEvent.change(url, {
      target: { value: 'www.testUrl.com' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
    expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
    expect(createBlog.mock.calls[0][0].url).toBe('www.testUrl.com')

  })
})
