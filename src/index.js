import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter.js'
import {createStore} from 'redux'

const counterReducer = (state = 9, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counterReducer)

const handleIncrementClick = () => { store.dispatch({type: 'INCREMENT'}) }
const handleDecrementClick = () => { store.dispatch({type: 'DECREMENT'}) }

const render = () => {
  ReactDOM.render(
    <Counter
      count={store.getState()}
      increment={handleIncrementClick}
      decrement={handleDecrementClick}
    />,
    document.getElementById('root')
  );
}

store.subscribe(render)
render()
