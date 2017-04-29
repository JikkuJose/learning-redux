import React from 'react';
import ReactDOM from 'react-dom';
import CounterList from './components/CounterList.js'
import ControlPanel from './components/ControlPanel.js'
import Article from './components/Article.js'
import {createStore, combineReducers} from 'redux'

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  if(action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  }

  return state
}

const counters = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TO_EACH':
      let addedToEach = Object.entries(state).reduce((acc, [id, count]) => {
        acc[id] = count + 1
        return acc
      },{})

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

const counterApp = combineReducers({counters, visibilityFilter})

const store = createStore(counterApp)

const getVisible = () => {
  let { counters, visibilityFilter } = store.getState()

  switch(visibilityFilter) {
    case 'SHOW_ODD':
      let odd = Object.entries(counters).reduce((accu, [id, count]) => {
        if(count % 2 !== 0) {
          accu[id] = count
        }

        return accu
      }, {})
      return odd
    case 'SHOW_EVEN':
      let even = Object.entries(counters).reduce((accu, [id, count]) => {
        if(count % 2 === 0) {
          accu[id] = count
        }

        return accu
      }, {})
      return even
    default:
      return counters
  }
}

const handleIncrementClick = (id) => () => { store.dispatch({type: 'INCREMENT', id}) }
const handleDecrementClick = (id) => () => { store.dispatch({type: 'DECREMENT', id}) }
const handleDeleteCounter = (id) => () => { store.dispatch({type: 'DELETE_COUNTER', id}) }

const handleAddCounter = () => { store.dispatch({type: 'ADD_COUNTER'}) }
const handleDeleteAll = () => { store.dispatch({type: 'DELETE_ALL'}) }
const handleAddToEach = () => { store.dispatch({type: 'ADD_TO_EACH'}) }
const handleShowEven = () => { store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_EVEN'}) }
const handleShowOdd = () => { store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ODD'}) }
const handleShowAll = () => { store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL'}) }

const render = () => {
  ReactDOM.render(
    <div>
      <ControlPanel
        onAddClick={handleAddCounter}
        onDeleteAllClick={handleDeleteAll}
        onAddToEachClick={handleAddToEach}
        onShowEvenClick={handleShowEven}
        onShowOddClick={handleShowOdd}
        onShowAllClick={handleShowAll}
      />
      <CounterList
        counters={getVisible()}
        onIncrementClick={handleIncrementClick}
        onDecrementClick={handleDecrementClick}
        onDeleteClick={handleDeleteCounter}
      />
      <Article />
    </div> ,
    document.getElementById('root')
  );
}

store.subscribe(render)
render()
