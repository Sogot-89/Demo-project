import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Counter from './Counter'

describe('Counter', () => {
  it('renders the initial count', () => {
    render(<Counter initialCount={3} />)
    expect(screen.getByTestId('count-value')).toHaveTextContent('3')
  })

  it('increments and decrements the count on click', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const value = screen.getByTestId('count-value')
    expect(value).toHaveTextContent('0')

    await user.click(screen.getByRole('button', { name: 'Increment' }))
    await user.click(screen.getByRole('button', { name: 'Increment' }))
    expect(value).toHaveTextContent('2')

    await user.click(screen.getByRole('button', { name: 'Decrement' }))
    expect(value).toHaveTextContent('1')
  })
})
