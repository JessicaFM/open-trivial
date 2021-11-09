import fetch from 'isomorphic-fetch'
import { getCategoryByValue } from 'constants/itemsElements'

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const URL = 'https://opentdb.com/api.php?'

function requestQuestions(query) {
  return {
    type: REQUEST_QUESTIONS,
    query: query
  }
}

function receiveQuestion(json, category) {
  return {
    type: RECEIVE_QUESTIONS,
    questions: json.results.map(child => child),
    receivedAt: Date.now(),
    category: getCategoryByValue(category).name
  }
}

function shouldFetchQuestions(state) {
  const questions = state.questionsx
  if (!questions) {
    return true
  } else if (questions.isFetching) {
    return false
  } else {
    return questions.didInvalidate
  }
}

function fetchQuestions(parameters) {
  var query = ''
  if(parameters.amount) {
    query += 'amount='+ parameters.amount
  } 
  if(parameters.category) {
    query += '&category='+ parameters.category
  } 
  if(parameters.difficulty) {
    query += '&difficulty='+ parameters.difficulty
  } 
  if(parameters.type) {
    query += '&type='+ parameters.type
  } 

  return dispatch => {
    dispatch(requestQuestions(query))
    return fetch(URL + query, { headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, })
      .then(response => response.json())
      .then(json => dispatch(receiveQuestion(json, parameters.category)))
  }
}

export function fetchQuestionsIfNeeded(parameters) {
  return (dispatch, getState) => {
    if (shouldFetchQuestions(getState())) {
      return dispatch(fetchQuestions(parameters))
    }
  }
}