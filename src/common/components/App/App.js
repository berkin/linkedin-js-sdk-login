import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { Home, Login } from '../'

const App = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/callback" component={Login} />
	</Switch>
)

export default App
