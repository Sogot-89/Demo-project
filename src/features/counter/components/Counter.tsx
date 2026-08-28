import { useUiStore } from '@/store/useUiStore'

export const Counter = () => {
  const count = useUiStore((s) => s.count)
  const increment = useUiStore((s) => s.increment)
  const decrement = useUiStore((s) => s.decrement)

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg" aria-live="polite">
        Count is{' '}
        <span data-testid="count-value" className="font-mono font-bold">
          {count}
        </span>
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={decrement}
          className="rounded bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300"
        >
          Decrement
        </button>
        <button
          type="button"
          onClick={increment}
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Increment
        </button>
      </div>
    </div>
  )
}
