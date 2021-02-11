import React from 'react';
import styled from 'styled-components';

import { H1Styles, PStyles, PrimaryButton } from 'styles/common';

const NotFound: React.FC = () => {
	return (
		<>
		<Container>
			<Telescope src="/images/Telescope.png" />
			<PageTitle>404 - Oh no, destination not found</PageTitle>
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

const PageTitle = styled.h1`
	${H1Styles}
	margin-bottom: 8px;
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
	${PStyles}
	margin-top: 0;
	margin-bottom: 48px;
	color: ${(props) => props.theme.colors.gray};
`;

const Button = styled(PrimaryButton)`
`;
