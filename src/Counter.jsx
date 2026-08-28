import { useState } from 'react'

function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount)

  return (
    <div className="counter">
      <p>
        Count is <span data-testid="count-value">{count}</span>
      </p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
      <button type="button" onClick={() => setCount((c) => c - 1)}>
        Decrement
      </button>
    </div>
  )
}

export default Counter
