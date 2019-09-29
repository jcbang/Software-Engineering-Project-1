import React, { Component } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
	.navbar {
		background-color: #c9c9e0;
	}

	a,
	.navbar-nav .navbar-brand .nav-link {
		color: #252121;

		&:hover {
			color: black;
		}
	}
`;

class NavigationBar extends Component {
	render() {
		return (
			<Styles>
				<Navbar expand='lg'>
					<Navbar.Brand href='/'>Summit</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<input
								type='text'
								name='search'
								placeholder='Search'
								onChange={this.props.onChange}
								style={{ marginRight: '3px' }}
							/>
							<span></span>
							<Button
								variant='outline-danger'
								onClick={this.props.handleLogout}
								style={{ marginLeft: '3px' }}
							>
								Logout
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Styles>
		);
	}
}

export default NavigationBar;
