import { combineReducers } from 'redux'
import {
  REQUEST_QUESTIONS, RECEIVE_QUESTIONS
} from 'actions/index.js'
  
  function questions(state = {
    isLoading: false,
    amount: 0, 
    category: "",
    items: []
  }, action) {
    switch (action.type) {
      case REQUEST_QUESTIONS:
        return Object.assign({}, state, {
          isLoading: true
        })
      case RECEIVE_QUESTIONS:
        return Object.assign({}, state, {
          isLoading: false,
          items: action.questions,
          category: action.category
        })
      default:
        return state
    }
  }

  function questionSelected(state = {}, action) {
    switch (action.type) {
      case REQUEST_QUESTIONS:
      case RECEIVE_QUESTIONS:
        return Object.assign({}, state, {
          data: questions(state[action], action)
        })
      default:
        return state
    }
  }

  const rootReducer = combineReducers({
    questionSelected,
  })
  
  export default rootReducer