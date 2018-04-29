import { combineReducers } from 'redux'
import { SAVE_USER, LOGOUT } from '../constants/actionTypes'

const isAuthenticated = (state = false, action) => {
	switch (action.type) {
		case SAVE_USER:
			return true
		case LOGOUT:
			return false
		default:
			return state
	}
}

const details = (state = {}, action) => {
	switch (action.type) {
		case SAVE_USER:
			return action.user.values[0]
		case LOGOUT:
		default:
			return state
	}
}

export const getFullname = state =>
	`${state.user.details.firstName} ${state.user.details.lastName}`

export default combineReducers({
	isAuthenticated,
	details,
})
