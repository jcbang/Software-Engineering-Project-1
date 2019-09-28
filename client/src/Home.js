import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import { UserInfo } from './UserInfo';
import { NoMatch } from './NoMatch';
import { Layout } from './Components/Layout';
import NavigationBar from './Components/NavigationBar';
import Jumbotron from './Components/Jumbotron';
import './sass/index.scss';
import LoginBox from './Components/LoginBox';
import RegisterBox from './Components/RegisterBox';

class Home extends Component {
	state = {
		isLoginOpen: true,
		isRegisterOpen: false,
		isLoggedIn: false,
		userID: '',
		sessionID: '',
		search: ''
	};

	showLoginBox = () => {
		this.setState({
			isLoginOpen: true,
			isRegisterOpen: false
		});
	};

	showRegisterBox = () => {
		this.setState({
			isLoginOpen: false,
			isRegisterOpen: true
		});
	};

	doLogIn = (userID, sessionID) => {
		this.setState(prevState => ({
			isLoggedIn: !prevState.isLoggedIn,
			userID: userID,
			sessionID: sessionID
		}));
	};

	doLogOut = sessionID => {
		axios.post('/api/user/logout', this.state.sessionID).then(
			this.setState({
				isLoggedIn: false,
				userID: '',
				sessionID: ''
			})
		);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		if (this.state.isLoggedIn) {
			return (
				<React.Fragment>
					<Router>
						<NavigationBar handleLogout={this.doLogOut} onChange={this.onChange} />
						<Jumbotron />
						<Layout>
							<Switch>
								<Route
									exact
									path="/"
									component={() => (
										<Dashboard userID={this.state.userID} search={this.state.search} />
									)}
								/>
								<Route path="/userinfo" component={UserInfo} />
								<Route component={NoMatch} />
							</Switch>
						</Layout>
					</Router>
				</React.Fragment>
			);
		} else {
			return (
				<div className="root-container">
					<div className="login-container">
						<div className="box-controller">
							<div
								className={
									'controller selected-controller-' +
									(this.state.isLoginOpen ? 'login' : '')
								}
								onClick={this.showLoginBox}
							>
								Login
							</div>

							<div
								className={
									'controller selected-controller-' +
									(this.state.isRegisterOpen ? 'register' : '')
								}
								onClick={this.showRegisterBox}
							>
								Register
							</div>
						</div>

						<div className="box-container">
							{this.state.isLoginOpen && <LoginBox handleLogin={this.doLogIn} />}
							{this.state.isRegisterOpen && <RegisterBox />}
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Home;
