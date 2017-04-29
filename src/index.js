import React from 'react';
import ReactDOM from 'react-dom';
import CounterList from './components/CounterList.js'
import ControlPanel from './components/ControlPanel.js'
import {createStore} from 'redux'

const counterReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TO_EACH':
      let addedToEach = Object.entries(state).reduce((acc, [id, count]) => {
        acc[id] = count + 1
        return acc
      },{})
      console.log(addedToEach)
      return addedToEach
    case 'DELETE_ALL':
      return {}
    case 'ADD_COUNTER':
      let randomId = Math.random().toString(36).substr(3, 5)
      return {...state, ...{[randomId]: 0}}
    case 'DELETE_COUNTER':
      let newState = {...state}
      delete newState[action.id]
      return newState
    case 'INCREMENT':
      return {...state, ...{[action.id]: state[action.id] + 1 }}
    case 'DECREMENT':
      return {...state, ...{[action.id]: state[action.id] - 1 }}
    default:
      return state
  }
}

const store = createStore(counterReducer)

const handleIncrementClick = (id) => () => { store.dispatch({type: 'INCREMENT', id}) }
const handleDecrementClick = (id) => () => { store.dispatch({type: 'DECREMENT', id}) }
const handleDeleteCounter = (id) => () => { store.dispatch({type: 'DELETE_COUNTER', id}) }

const handleAddCounter = () => { store.dispatch({type: 'ADD_COUNTER'}) }
const handleDeleteAll = () => { store.dispatch({type: 'DELETE_ALL'}) }
const handleAddToEach = () => { store.dispatch({type: 'ADD_TO_EACH'}) }

const render = () => {
  ReactDOM.render(
    <div>
      <ControlPanel
        onAddClick={handleAddCounter}
        onDeleteAllClick={handleDeleteAll}
        onAddToEachClick={handleAddToEach}
      />
      <CounterList
        counters={store.getState()}
        onIncrementClick={handleIncrementClick}
        onDecrementClick={handleDecrementClick}
        onDeleteClick={handleDeleteCounter}
      />
    </div> ,
    document.getElementById('root')
  );
}

store.subscribe(render)
render()
