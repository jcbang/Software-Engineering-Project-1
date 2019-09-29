import React, { Component } from 'react';
import axios from 'axios';
import {
	Button,
	Card,
	CardBody,
	Modal,
	ModalBody,
	ModalFooter,
	Row,
	Col
} from 'reactstrap';

class AddTile extends Component {
	state = {
		firstName: '',
		phone: '',
		company: '',
		street: '',
		city: '',
		state: '',
		zip: '',
		modal: false
	};

	toggleModal = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	};

	handleAdd = () => {
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

		this.props.handleAdd(contactInfo);
		this.toggleModal();
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<div>
				<Card onClick={this.toggleModal} style={this.props.tileStyle}>
					<CardBody>
						Add <br />
						Contact
					</CardBody>
					<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
						<ModalBody>
							<Button close onClick={this.toggleModal} />
							<Row>
								<h2>
									<input
										type='text'
										name='firstName'
										placeholder='First Name'
										onChange={this.onChange}
									/>
								</h2>
								<h2>
									<input
										type='text'
										name='lastName'
										placeholder='Last Name'
										onChange={this.onChange}
									/>
								</h2>
							</Row>
							<Row>
								<Col>
									<b>Company</b> <br />
									<input
										type='text'
										name='company'
										placeholder='Company'
										onChange={this.onChange}
									/>
								</Col>
								<Col>
									<b>Phone Number</b> <br />
									<input
										type='text'
										name='phone'
										placeholder='Phone'
										onChange={this.onChange}
									/>
								</Col>
							</Row>{' '}
							<br />
							<b>Address</b> <br />
							<input
								type='text'
								name='street'
								placeholder='Street'
								onChange={this.onChange}
							/>
							<br />
							<input
								type='text'
								name='city'
								placeholder='City'
								onChange={this.onChange}
							/>
							<input
								type='text'
								name='state'
								placeholder='State'
								onChange={this.onChange}
							/>
							,{' '}
							<input
								type='text'
								name='zip'
								placeholder='Zip'
								onChange={this.onChange}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								style={{ padding: '3px' }}
								outline
								color='success'
								onClick={this.handleAdd}
							>
								Save
							</Button>
						</ModalFooter>
					</Modal>
				</Card>
			</div>
		);
	}
}

export default AddTile;
