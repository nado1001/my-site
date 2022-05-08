import { render, screen } from '@testing-library/react'
import React from 'react'

import { Article } from '.'

describe('article component', () => {
  test('should render article component by passing prop', () => {
    render(<Article id="1" title="Test" date="2022-05-07" slug="test" />)

    const articleTitle = screen.getByRole('heading')
    expect(articleTitle.innerHTML).toBe('Test')

    const articleDate = screen.getByTestId('article-date')
    expect(articleDate.innerHTML).toBe('2022.05.07')

    const articleNav = screen.getByTestId('article-nav')
    expect(articleNav.getAttribute('href')).toBe('/articles/test')
  })
})
