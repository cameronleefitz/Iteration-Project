import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

import NavBar from './component/navigationBar/navBar.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './component/logedIn/Login.jsx';
import Signup from './component/logedIn/Signup.jsx';
import Canvas from './component/logedIn/canvas.jsx';
import Home from './component/logedIn/home';
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logStatus: false
		};
		this.onLogged = this.onLogged.bind(this);
		this.onSignUp = this.onSignUp.bind(this);
	}

	componentDidMount() {
		console.log(this.props.cookies.cookies.signedin);
		if (this.props.cookies.cookies.signedin) {
			return this.setState({
				logStatus: true
			});
		}
	}

	onLogged(username, password) {
		console.log('onLogged invoked');
		console.log(username, password);
		fetch('/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('onLogged data:', data);
				this.setState({
					...this.state,
					logStatus: data.logStatus
				});
			})
			.catch((err) => console.log('err onLogged:', err));
	}

	onSignUp(username, password) {
		console.log('onSignUp invoked');
		console.log(username, password);
		fetch('/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('onSignUp data:', data);
				this.setState({
					...this.state,
					logStatus: data.logStatus
				});
			})
			.catch((err) => console.log('err onLogged:', err));
	}

	render() {
		let renderCanvas;
		if (this.state.logStatus) {
			renderCanvas = <Canvas />;
		}

		let renderLogin;
		if (!this.state.logStatus) {
			renderLogin = (
				<Route
					path="/login"
					render={(routeProps) => <Login onSignUp={this.onSignUp} onLogged={this.onLogged} />}
				/>
			);
		}

		let renderHome;
		if (!this.state.logStatus) {
			renderHome = <Route path="/" component={Home} />;
		}

		let renderLogin;
		let renderSignUp;
		let renderHome;
		if (!this.state.logStatus) {
			renderLogin = <Route path="/login" render={(routeProps) => <Login onLogged={this.onLogged} />} />;

			renderSignUp = <Route path="/signup" render={(routeProps) => <Signup onSignUp={this.onSignUp} />} />;

			renderHome = <Route path="/" component={Home} />;
		}

		return (
			<Router>
				<div>
					<NavBar />
					<Switch>
						{/* <Route path="/login"  component={Login} /> */}
						{renderLogin}
						{renderSignUp}
						{/* <Route path="/canvas"  component={Canvas}/> */}
						{renderHome}
					</Switch>
				</div>
				{renderCanvas}
			</Router>
		);
	}
}

export default withCookies(App);
