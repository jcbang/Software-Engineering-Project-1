import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CollapsedTile from './CollapsedTile';
import ExpandedTile from './ExpandedTile';
import '../sass/_loginSty.scss';

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

class Tile extends Component {
	state = {
		isCollapsed: true,
		isExpanded: false
	};

	expandCard = () => {
		this.setState({
			isCollapsed: false,
			isExpanded: true
		});
	};

	collapseCard = () => {
		this.setState({
			isCollapsed: true,
			isExpanded: false
		});
	};

	deleteContact = () => {
		if (window.confirm('Are you sure you wish to delete this item?')) alert('contact deleted :(');
	};

	render() {
		return (
			<div>
				<CollapsedTile
					user={this.props.user}
					tileStyle={collapseStyle}
					handleEdit={this.editContact}
					handleDelete={this.deleteContact}
				/>
			</div>

			// <div>
			// 	{this.state.isCollapsed && (
			// 		<CollapsedTile
			// 			user={this.props.user}
			// 			tileStyle={collapseStyle}
			// 			handleExpand={this.expandCard}
			// 		/>
			// 	)}
			// 	{this.state.isExpanded && (
			// 		<ExpandedTile
			// 			user={this.props.user}
			// 			tileStyle={expandStyle}
			// 			handleCollapse={this.collapseCard}
			// 			handleDelete={this.deleteContact}
			// 		/>
			// 	)}
			// </div>
		);
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

const expandStyle = {
	textAlign: 'left',
	borderRadius: '10px',
	padding: '15px',
	backgroundColor: '#3e3e42',
	minWidth: '21em',
	width: 'auto',
	height: 'auto',
	margin: '5px'
};

export default Tile;
