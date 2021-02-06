import React, { useEffect, useState } from 'react';
import { Box, Stat, StatNumber, StatLabel, Text, StatHelpText } from '@chakra-ui/react';
import CountUp from 'react-countup';

interface StatBoxProps {
	title: string;
	tokenTicker: string;
	value: string;
	isCurrency?: boolean;
	helperText?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({
	title,
	value,
	tokenTicker,
	isCurrency = false,
	helperText,
	...rest
}) => {
	const [start, updateStart] = useState(0);
	const [end, updateEnd] = useState(0);

	useEffect(() => {
		updateStart(end);
		updateEnd(parseFloat(value));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<Box p={5} boxShadow="md" borderWidth="1px" {...rest} width="100%">
			<Stat>
				<StatLabel fontSize="sm" mb={2} fontWeight="bold">
					{title}
				</StatLabel>
				<StatNumber
					fontSize={['xs', 'xs', 'lg']}
					color="blue.500"
					fontWeight="300"
					display="flex"
					mb={2}
				>
					{isCurrency && <Text mr={2}>$</Text>}

					<CountUp
						start={start}
						end={end}
						decimals={end < 1 ? 4 : 2}
						duration={1}
						separator={','}
					/>
					<Text ml={2}>{tokenTicker}</Text>
				</StatNumber>
				<StatHelpText>{helperText}</StatHelpText>
			</Stat>
		</Box>
	);
};
