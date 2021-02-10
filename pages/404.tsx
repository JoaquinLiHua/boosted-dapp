import React from 'react';
import styled from 'styled-components';

import { H1, PrimaryButton } from 'styles/common';

const NotFound: React.FC = () => {
	return (
		<>
		<Container>
			<Telescope src="/images/Telescope.png" />
			<Title404>404 - Oh no, destination not found</Title404>
			<P>Well, this is awkward... The link you followed may be broken, or the page may have been removed.</P>
			<Button href="/">Back to the home planet</Button>
		</Container>
		</>
	);
};

export default NotFound;

const Container = styled.div`
	margin-top: 10vw;
	text-align: center;
`;

const Title404 = styled(H1)`
	
	margin-bottom: 0;
	font-family: ${(props) => props.theme.fonts.interSemiBold};
`;

const Telescope = styled.img`
	margin: 0 auto;
	display: flex;
	max-width: 128px;
	width: 80%;
	margin-bottom: 24px;
`;

const P = styled.p`
	margin-top: 8px;
	margin-bottom: 48px;
	font-size: 14px;
	color: #B3B3B3;
	letter-spacing: 0;
	line-height: 24px;
	font-family: ${(props) => props.theme.fonts.interMedium};
`;

const Button = styled(PrimaryButton)`
`;
