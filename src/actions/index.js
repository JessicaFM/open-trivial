import fetch from 'isomorphic-fetch'

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

function requestQuestions() {
  return {
    type: REQUEST_QUESTIONS,
  }
}

function receiveQuestion(json) {
  return {
    type: RECEIVE_QUESTIONS,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function shouldFetchQuestions(state) {
  const posts = state.questions
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

function fetchQuestions() {
  var subreddit = 'react'
  return dispatch => {
    dispatch(requestQuestions(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveQuestion(json)))
  }
}

export function fetchQuestionsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchQuestions(getState())) {
      return dispatch(fetchQuestions())
    }
  }
}