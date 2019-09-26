import React, { Component } from 'react';
import {
	Button,
	Card,
	CardImg,
	CardHeader,
	CardTitle,
	CardSubtitle,
	CardBody,
	CardFooter,
	CardText,
	Modal,
	ModalBody,
	ModalFooter,
	FormGroup,
	Form,
	Label,
	Input,
	Row,
	Col
} from 'reactstrap';

class Tile extends Component {
	state = {
		id: '',
		name: '',
		email: '',
		phone: '',
		street: '',
		city: '',
		zipcode: '',
		modal: false,
		modalEditable: false
	};

	componentDidMount() {
		this.setState({
			id: this.props.user.id,
			name: this.props.user.name,
			email: this.props.user.email,
			phone: this.props.user.phone,
			street: this.props.user.address.street,
			city: this.props.user.address.city,
			zipcode: this.props.user.address.zipcode
		});
	}

	handleDelete = () => {
		this.props.handleDelete(this.state.id);
	};

	editContact = () => {
		alert(
			'Name: ' +
				this.state.name +
				'\n' +
				'Email: ' +
				this.state.email +
				'\n' +
				'Phone: ' +
				this.state.phone +
				'\n' +
				'Address: \n' +
				this.state.street +
				'\n' +
				this.state.city +
				', ' +
				this.state.zipcode
		);
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
						<CardBody>{this.props.user.name}</CardBody>
						<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
							<ModalBody>
								<Button close onClick={this.toggleModal} />
								<h2>
									<input
										type='text'
										name='name'
										defaultValue={this.state.name}
										onChange={this.onChange}
									/>
								</h2>
								<Row>
									<Col>
										<b>Email</b> <br />
										<input
											type='text'
											name='email'
											defaultValue={this.state.email}
											onChange={this.onChange}
										/>
									</Col>
									<Col>
										<b>Phone Number</b> <br />
										<input
											type='text'
											name='phone'
											defaultValue={this.state.phone}
											onChange={this.onChange}
										/>
									</Col>
								</Row>{' '}
								<br />
								<b>Address</b> <br />
								<input
									type='text'
									name='street'
									defaultValue={this.state.street}
									onChange={this.onChange}
								/>
								<br />
								{/* {this.state.street} <br /> */}
								<input
									type='text'
									name='city'
									defaultValue={this.state.city}
									onChange={this.onChange}
								/>
								,{' '}
								<input
									type='text'
									name='zipode'
									defaultValue={this.state.zipcode}
									onChange={this.onChange}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									style={{ padding: '3px' }}
									outline
									color='info'
									onClick={this.toggleEditable}
								>
									Cancel
								</Button>
								<Button
									style={{ padding: '3px' }}
									outline
									color='success'
									onClick={this.editContact}
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
						<CardBody>{this.state.name}</CardBody>
						<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
							<ModalBody>
								<Button close onClick={this.toggleModal} />
								<h2>{this.state.name}</h2>
								<Row>
									<Col>
										<b>Email</b> <br />
										{this.state.email}
									</Col>
									<Col>
										<b>Phone Number</b> <br />
										{this.state.phone}
									</Col>
								</Row>{' '}
								<br />
								<b>Address</b> <br />
								{this.state.street} <br />
								{this.state.city}, {this.state.zipcode}
							</ModalBody>
							<ModalFooter>
								<Button
									style={{ padding: '3px' }}
									outline
									color='info'
									onClick={this.toggleEditable}
								>
									{this.state.modalEditable ? 'Cancel' : 'Edit'}
								</Button>
								<Button
									style={{ padding: '3px' }}
									outline
									color='danger'
									onClick={this.props.handleDelete}
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
