import React from 'react'
import Counter from './Counter.js'

const CounterList = ({
  counters,
  onIncrementClick,
  onDecrementClick,
  onDeleteClick
}) => {
  return <div>
    {
      Object.entries(counters).map(([id, count]) => <Counter
        count={count}
        key={id}
        increment={onIncrementClick(id)}
        decrement={onDecrementClick(id)}
        delete={onDeleteClick(id)}
      />)
    }
  </div>
}

export default CounterList
