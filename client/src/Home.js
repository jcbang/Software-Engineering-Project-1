import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { UserInfo } from './UserInfo';
import { NoMatch } from './NoMatch';
import { Layout } from './Components/Layout';
import NavigationBar from './Components/NavigationBar';
import Jumbotron from './Components/Jumbotron';
import './sass/index.scss';

class Home extends Component {
	render() {
		return (
			<React.Fragment>
				<Router>
					<NavigationBar />
					<Jumbotron />
					<Layout>
						<Switch>
							<Route exact path='/' component={Dashboard} />
							<Route path='/userinfo' component={UserInfo} />
							<Route component={NoMatch} />
						</Switch>
					</Layout>
				</Router>
			</React.Fragment>
		);
	}
}

export default Home;
