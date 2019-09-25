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
					<Tile key={user.id} user={user} tileStyle={collapseStyle} />
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

const collapseStyle = {
	flexDirection: 'row',
	textAlign: 'center',
	borderRadius: '10px',
	backgroundColor: '#3e3e42',
	width: 'auto',
	margin: '5px',
	fontSize: 'calc(10px + 1vw)',
	fontStyle: 'bold',
	cursor: 'pointer'
};

export default Tiles;
