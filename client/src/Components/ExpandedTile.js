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
	FormGroup,
	Form,
	Input,
	Row,
	Col
} from 'reactstrap';

class ExpandedTile extends Component {
	state = {
		isEditable: false,
		user: {}
	};

	componentDidMount() {
		this.setState({ user: this.props.user });
	}

	toggleEdit = () => {
		this.setState(prevState => ({
			isEditable: !prevState.isEditable
		}));
	};

	handleCollapse = () => {
		this.props.handleCollapse();
	};

	handleDelete = () => {
		this.props.handleDelete();
	};

	render() {
		const { user } = this.props;
		return (
			<Card style={this.props.tileStyle}>
				<CardText>
					<Button close onClick={this.handleCollapse} />
					<h3>{user.name}</h3>
					<p>
						<b>Email</b> <br />
						{user.email}
					</p>
					<p>
						<b>Phone</b> <br />
						{user.phone}
					</p>
					<p>
						<b>Address</b> <br />
						{user.address.street} <br />
						{user.address.city}, {user.address.zipcode}
					</p>
					<p>{this.state.isEditing}</p>
					<Button
						style={{ marginRight: '2px', padding: '2px' }}
						outline
						color='danger'
						onClick={this.handleDelete}
					>
						Delete
					</Button>
					<Button
						style={{ marginLeft: '2px', padding: '2px' }}
						outline
						color='info'
						onClick={this.toggleEdit}
					>
						{this.state.isEditable ? 'Cancel' : 'Edit'}
					</Button>
				</CardText>
			</Card>
		);
	}
}

export default ExpandedTile;
