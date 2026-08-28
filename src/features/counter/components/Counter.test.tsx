import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useUiStore } from '@/store/useUiStore'

import { Counter } from './Counter'

beforeEach(() => {
  useUiStore.setState({ count: 0 })
})

describe('Counter', () => {
  it('renders the initial count', () => {
    render(<Counter />)
    expect(screen.getByTestId('count-value')).toHaveTextContent('0')
  })

  it('increments and decrements the count on click', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByRole('button', { name: /increment/i }))
    await user.click(screen.getByRole('button', { name: /increment/i }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('2')

    await user.click(screen.getByRole('button', { name: /decrement/i }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('1')
  })
})
