import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SAVE_USER, LOGOUT } from '../../constants/actionTypes'
import { getFullname } from '../../reducers/user'

class Login extends Component {
	constructor(props) {
		super(props)

		this.authorize = this.authorize.bind(this)
		this.logout = this.logout.bind(this)
	}

	componentDidMount() {
		window.IN.Event.onDOMReady(() => {
			if (window.IN.User && window.IN.User.isAuthorized()) {
				this.getUser()
			}
		})
	}

	getUser() {
		const { dispatch } = this.props
		window.IN.API.Profile('me').result(user => {
			dispatch({
				type: SAVE_USER,
				user,
			})
		})
	}

	authorize(e) {
		e.preventDefault()
		window.IN.User.authorize(this.getUser, this)
	}

	logout(e) {
		e.preventDefault()
		const { dispatch } = this.props
		window.IN.User.logout(() => {
			dispatch({
				type: LOGOUT,
			})
		}, this)
	}

	render() {
		const { isAuthenticated, fullname } = this.props
		return (
			<div>
				{isAuthenticated ? (
					<div>
						{fullname} <button onClick={this.logout}>Logout</button>
					</div>
				) : (
					<div>
						<button onClick={this.authorize}>Sign In LinkedIN</button>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.user.isAuthenticated,
	fullname: getFullname(state),
})

export default connect(mapStateToProps)(Login)
