import React, { Component } from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import background from '../images/background.jpg';

const Styles = styled.div`
	.jumbo {
		background: url(${background}) no-repeat fixed bottom;
		background-size: cover;
		color: #efefef;
		height: 180px;
		position: relative;
		z-index: -2;
	}

	.overlay {
		background-color: #000;
		opacity: 0.6;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: -1;
	}

	.tagline {
		text-indent: 200px;
	}
`;

class Jumbotron extends Component {
	render() {
		return (
			<Styles>
				<Jumbo fluid className='jumbo'>
					<div className='overlay'></div>
					<Container>
						<h1>Welcome to Summit</h1>
						<div className='tagline'>
							<p>
								<i>the peak of contact managers</i>
							</p>
						</div>
					</Container>
				</Jumbo>
			</Styles>
		);
	}
}

export default Jumbotron;
