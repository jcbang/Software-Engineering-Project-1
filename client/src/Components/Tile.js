import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, Row, Col } from 'reactstrap';

class Tile extends Component {
	state = {
		id: '',
		firstName: '',
		phone: '',
		company: '',
		street: '',
		city: '',
		state: '',
		zip: '',
		modal: false,
		modalEditable: false
	};

	componentDidMount() {
		this.setState({
			id: this.props.user._id,
			firstName: this.props.user.firstName,
			lastName: this.props.user.lastName,
			phone: this.props.user.phone,
			company: this.props.user.company,
			street: this.props.user.address.street,
			city: this.props.user.address.city,
			state: this.props.user.address.state,
			zip: this.props.user.address.zip
		});

		console.log(this.props.user);
	}

	handleDelete = () => {
		if (window.confirm('Are you sure you wish to delete this item?')) {
			this.props.handleDelete(this.state.id);
			this.toggleModal();
		}
	};

	handleEdit = () => {
		const contactInfo = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			phone: this.state.phone,
			company: this.state.company,
			address: {
				street: this.state.street,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zip
			}
		};

		this.props.handleEdit(this.state.id, contactInfo);
		this.toggleEditable();
	};

	toggleModal = () => {
		this.setState(prevState => ({
			modal: !prevState.modal,
			modalEditable: false
		}));
	};

	toggleEditable = () => {
		this.setState(prevState => ({
			modalEditable: !prevState.modalEditable
		}));
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		if (this.state.modalEditable) {
			return (
				<div>
					<Card onClick={this.toggleModal} style={this.props.tileStyle}>
						<CardBody>
							{this.props.user.firstName} <br />
							{this.props.user.lastName}
						</CardBody>
						<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
							<ModalBody>
								<Button close onClick={this.toggleModal} />
								<Row>
									<h2>
										<input
											type="text"
											name="firstName"
											defaultValue={this.state.firstName}
											onChange={this.onChange}
										/>
									</h2>
									<h2>
										<input
											type="text"
											name="lastName"
											defaultValue={this.state.lastName}
											onChange={this.onChange}
										/>
									</h2>
								</Row>
								<Row>
									<Col>
										<b>Company</b> <br />
										<input
											type="text"
											name="company"
											defaultValue={this.state.company}
											onChange={this.onChange}
										/>
									</Col>
									<Col>
										<b>Phone Number</b> <br />
										<input
											type="text"
											name="phone"
											defaultValue={this.state.phone}
											onChange={this.onChange}
										/>
									</Col>
								</Row>{' '}
								<br />
								<b>Address</b> <br />
								<input
									type="text"
									name="street"
									defaultValue={this.state.street}
									onChange={this.onChange}
								/>
								<br />
								<input
									type="text"
									name="city"
									defaultValue={this.state.city}
									onChange={this.onChange}
								/>
								<input
									type="text"
									name="state"
									defaultValue={this.state.state}
									onChange={this.onChange}
								/>
								,{' '}
								<input
									type="text"
									name="zip"
									defaultValue={this.state.zip}
									onChange={this.onChange}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									style={{ padding: '3px' }}
									outline
									color="info"
									onClick={this.toggleEditable}
								>
									Cancel
								</Button>
								<Button
									style={{ padding: '3px' }}
									outline
									color="success"
									onClick={this.handleEdit}
								>
									Save
								</Button>
							</ModalFooter>
						</Modal>
					</Card>
				</div>
			);
		} else {
			return (
				<div>
					<Card onClick={this.toggleModal} style={this.props.tileStyle}>
						<CardBody>
							{this.state.firstName} <br /> {this.state.lastName}
						</CardBody>
						<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
							<ModalBody>
								<Button close onClick={this.toggleModal} />
								<h2>
									{this.state.firstName} {this.state.lastName}{' '}
								</h2>
								<Row>
									<Col>
										<b>Company</b> <br />
										{this.state.company}
									</Col>
									<Col>
										<b>Phone Number</b> <br />
										{this.state.phone}
									</Col>
								</Row>{' '}
								<br />
								<b>Address</b> <br />
								{this.state.street} <br />
								{this.state.city}, {this.state.state} <br />
								{this.state.zip}
							</ModalBody>
							<ModalFooter>
								<Button
									style={{ padding: '3px' }}
									outline
									color="info"
									onClick={this.toggleEditable}
								>
									{this.state.modalEditable ? 'Cancel' : 'Edit'}
								</Button>
								<Button
									style={{ padding: '3px' }}
									outline
									color="danger"
									onClick={this.handleDelete}
								>
									Delete
								</Button>
							</ModalFooter>
						</Modal>
					</Card>
				</div>
			);
		}
	}
}

export default Tile;
