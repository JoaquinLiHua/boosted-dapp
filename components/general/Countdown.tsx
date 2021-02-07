import { Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Countdown from 'react-countdown';

export const HeaderCountdown: React.FC = () => {
	const Completionist = () => (
		<Stack mt={4}>
			<Text fontSize="lg" fontWeight="bold">
				🚀 WAVE 3 POOL LIVE 🚀
			</Text>
		</Stack>
	);

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			return <Completionist />;
		} else {
			return (
				<Stack mt={4}>
					<Text fontSize="lg" textAlign="center" fontWeight="bold">
						🚀 WAVE 3 POOLS START 🚀
					</Text>
					<Text textAlign="center">
						{' '}
						{days}d:{hours}h:{minutes}m:{seconds}s
					</Text>
				</Stack>
			);
		}
	};

	return <Countdown date={new Date(1600347600 * 1000)} renderer={renderer} />;
};
