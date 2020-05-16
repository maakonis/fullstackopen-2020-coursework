import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog

  beforeEach(() => {
    blog = {
      title: 'React Testing Is Important',
      author: 'Elon Musk',
      url: 'www.tesla.com',
      likes: 10,
      user: { name: 'John', username: 'testjohn' }
    }
    component = render(
      <Blog blog={blog} />
    )
  })

  test('by default renders only author and title', () => {
    // renders author and title
    expect(component.container).toHaveTextContent(
      'React Testing Is Important'
    )
    expect(component.container).toHaveTextContent(
      'Elon Musk'
    )
    // url, user, and likes are hidden by default
    expect(component.container.querySelector('.blogExtraInfo'))
      .toHaveStyle('display: none')
  })

  test('shows url, user, likes after button click', () => {
    const viewButton = component.container.querySelector('button')
    fireEvent.click(viewButton)

    expect(component.container.querySelector('.blogExtraInfo'))
      .toHaveStyle('')
  })

  test('registers multiple clicks on the like button', () => {
    const updateBlog = jest.fn()

    component = render(
      <Blog blog={blog} updateBlog={updateBlog} />
    )

    const likeButton = component.container.querySelector('.vote')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})