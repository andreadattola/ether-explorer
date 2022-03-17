import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import rootReducers from '../reducers'


const sagaMiddleware = createSagaMiddleware()

const switchStore = () => {
  let store
  if (process.env.REACT_APP_ENV === 'production') {
    store = compose(applyMiddleware(sagaMiddleware))
  } else {
    store = composeWithDevTools(applyMiddleware(sagaMiddleware))
  }
  return store
}

const store = createStore(
  combineReducers({
    ...rootReducers,
  }),
  switchStore(),
)

export default store

sagaMiddleware.run(rootSaga)
