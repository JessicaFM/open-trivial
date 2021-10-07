import fetch from 'isomorphic-fetch'

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const URL = 'https://opentdb.com/api.php?'

function requestQuestions(query) {
  return {
    type: REQUEST_QUESTIONS,
    query: query
  }
}

function receiveQuestion(json) {
  console.log("receiveQuestion")
  console.log(json.results)
  return {
    type: RECEIVE_QUESTIONS,
    questions: json.results.map(child => child),
    receivedAt: Date.now()
  }
}

function shouldFetchQuestions(state) {
  const questions = state.questions
  console.log("QUESTIONS:")
  console.log(questions)
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
  // if(parameters.type) {
  //   query += '&type='+ parameters.type
  // } 

  //testing boolean options 
  query += '&type=boolean'

  return dispatch => {
    dispatch(requestQuestions(query))
    return fetch(URL + query, { headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, })
      .then(response => response.json())
      .then(json => dispatch(receiveQuestion(json)))
  }
}

export function fetchQuestionsIfNeeded(parameters) {
  return (dispatch, getState) => {
    if (shouldFetchQuestions(getState())) {
      return dispatch(fetchQuestions(parameters))
    }
  }
}