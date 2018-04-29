import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import appReducers from './reducers'

const configureStore = preloadedState => {
	const middlewares = [thunk]
	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger())
	}

	const store = createStore(
		appReducers,
		preloadedState,
		applyMiddleware(...middlewares),
	)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers').default
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}

export default configureStore
