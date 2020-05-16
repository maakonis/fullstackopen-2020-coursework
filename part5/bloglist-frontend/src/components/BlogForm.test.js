import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('adds a new blog correctly', () => {
  const createBlog = jest.fn()
  const putNotification = jest.fn()
  let component

  component =  render(
    <BlogForm
      createBlog={createBlog}
      putNotification={putNotification} />
  )

  const titleInput = component.container.querySelector('input[name="title"]')
  const authorInput = component.container.querySelector('input[name="author"]')
  const urlInput = component.container.querySelector('input[name="url"]')
  const form = component.container.querySelector('form')


  fireEvent.change(titleInput, {
    target: {
      value: 'Testing the title',
      name: 'title',
    }
  })
  fireEvent.change(authorInput, {
    target: {
      value: 'Michael Jordan',
      name: 'author',
    }
  })
  fireEvent.change(urlInput, {
    target: {
      value: 'www.nba.com',
      name: 'url',
    }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing the title')
  expect(createBlog.mock.calls[0][0].author).toBe('Michael Jordan')
  expect(createBlog.mock.calls[0][0].url).toBe('www.nba.com')
})