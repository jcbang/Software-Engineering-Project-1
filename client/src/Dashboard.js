import React, { Component } from 'react';
import Tiles from './Components/Tiles';
import NavigationBar from './Components/NavigationBar';
import Jumbotron from './Components/Jumbotron';
import './sass/index.scss';

class Dashboard extends Component {
	render() {
		return (
			<div>
				<Tiles userID={this.props.userID} search={this.props.search} />
			</div>
		);
	}
}

export default Dashboard;
