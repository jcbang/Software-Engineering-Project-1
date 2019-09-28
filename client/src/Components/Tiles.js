import React, { Component } from 'react';
import axios from 'axios';
import AddTile from './AddTile';
import Tile from './Tile';
import { Container, Row, Col } from 'reactstrap';

class Tiles extends Component {
	state = {
		users: []
	};

	componentDidMount() {
		axios
			.post('api/contacts/getallcontacts/' + this.props.userID, { userID: this.props.userID })
			.then(res => this.setState({ users: res.data }));
	}

	deleteContact = id => {
		axios
			.post('api/contacts/delete/' + id)
			.then(this.setState({ users: [...this.state.users.filter(user => user._id !== id)] }));
	};

	editContact = (id, newContact) => {
		axios.post('api/contacts/update/' + id, newContact);
	};

	addContact = newContact => {
		axios
			.post('api/contacts/add/' + this.props.userID, newContact)
			.then(this.setState({ users: [...this.state.users, newContact] }));
	};

	render() {
		let contactCards = this.state.users.map(user => {
			if (
				user.firstName.toLowerCase().includes(this.props.search) ||
				user.lastName.toLowerCase().includes(this.props.search)
			) {
				return (
					<Col sm="2">
						<Tile
							key={user._id}
							user={user}
							tileStyle={collapseStyle}
							handleDelete={this.deleteContact}
							handleEdit={this.editContact}
						/>
					</Col>
				);
			}
		});

		return (
			<Container fluid>
				<Row noGutters>
					<Col sm="2">
						<AddTile
							tileStyle={collapseStyle}
							userID={this.props.userID}
							handleAdd={this.addContact}
						/>
					</Col>
					{contactCards}
				</Row>
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
