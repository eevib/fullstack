import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('blogs', () =>  {
  let blog = ''
  let user = ''
  beforeEach(() => {
    blog = {
      title: 'blog',
      author: 'author',
      url: 'www.blog.com',
      likes: '3',
      user: '61bd801ac160d459976de331'
    }
    user = {
      username: 'testUser',
      password: 'secret'
    }
  })
  test('renders title and view button', () => {
    const component = render(
      <Blog blog={blog} user={user}/>
    )

    expect(component.container).toHaveTextContent('blog')
    expect(component.container).toHaveTextContent('view')
    expect(component.container).not.toHaveTextContent('www.blog.com')
  })

  test('shows all data when view button is clicked', () => {
    const component = render(
      <Blog blog={blog} user={user}/>
    )
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.blog.com')
    expect(component.container).toHaveTextContent('hide')
    expect(component.container).toHaveTextContent('likes')
    expect(component.container).toHaveTextContent('3')
    expect(component.container).toHaveTextContent('author')

  })

  test('clickin like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} user={user} addLike={mockHandler}/>
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

