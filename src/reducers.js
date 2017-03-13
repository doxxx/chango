import { handleActions } from 'redux-actions'

import * as actions from './actions'

const initialState = {
  processing: false,
  result: null
}

const handlers = {
  [actions.fileProcessingStarted]: (state, action) => ({
    ...state,
    processing: true
  }),
  [actions.fileProcessingFinished]: (state, action) => ({
    ...state,
    processing: false,
    result: action.payload
  })
}

export default handleActions(handlers, initialState)
