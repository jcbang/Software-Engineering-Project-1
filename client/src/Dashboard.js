import React, { Component } from 'react';
import Tiles from './Components/Tiles';
import './sass/index.scss';

class Dashboard extends Component {
	render() {
		return (
			<div>
				<h1></h1>
				<Tiles userID={this.props.userID} search={this.props.search} />
			</div>
		);
	}
}

export default Dashboard;
