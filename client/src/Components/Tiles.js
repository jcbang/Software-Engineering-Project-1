import React, { Component } from 'react';
import axios from 'axios';
import Tile from './Tile';
import {
	Button,
	Container,
	Card,
	CardImg,
	CardHeader,
	CardTitle,
	CardSubtitle,
	CardBody,
	CardFooter,
	CardText,
	FormGroup,
	Form,
	Input,
	Row,
	Col
} from 'reactstrap';

class Tiles extends Component {
	state = {
		users: []
	};

	componentDidMount() {
		axios
			.get('http://jsonplaceholder.typicode.com/users')
			.then(res => this.setState({ users: res.data }));
	}

	render() {
		let contactCards = this.state.users.map(user => {
			return (
				<Col sm='3'>
					<Tile key={user.id} user={user} />
				</Col>
			);
		});

		return (
			<Container fluid>
				<Row noGutters>{contactCards}</Row>
			</Container>
		);
		// return <Tile />;
		// return this.state.users.map(user => <Tile key={user.id} user={user} />);
	}
}

export default Tiles;
