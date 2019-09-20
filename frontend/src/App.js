import React, { Component } from 'react';
import LoginBox from './Components/LoginBox';
import RegisterBox from './Components/RegisterBox';
import ReactDOM from 'react-dom';
import './sass/_loginSty.scss';

class App extends Component {
	state = {
		isLoginOpen: true,
		isRegisterOpen: false
	};

	componentDidMount() {
		this.callApi()
		  .then(res => this.setState({ response: res.express }))
		  .catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('/api/hello');
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		
		return body;
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

	render() {
		return (
			<div className="root-container">
				<div className="login-container">
					<div className="box-controller">
						<div
							className={
								'controller selected-controller-' + (this.state.isLoginOpen ? 'login' : '')
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
						{this.state.isLoginOpen && <LoginBox />}
						{this.state.isRegisterOpen && <RegisterBox />}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
