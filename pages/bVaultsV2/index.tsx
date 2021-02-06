import React from 'react';
import { Flex, Heading, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { VaultCard } from 'components/bVaults/VaultCard';
import { useVaultContext } from 'context/VaultContext';
import { FaInfo } from 'react-icons/fa';

const Index: React.FC = () => {
	const { vaultsV2 } = useVaultContext();
	return (
		<Stack spacing={4} mt={4} width="100%">
			<Flex alignItems="center">
				<Heading>bVaults V2</Heading>
				<Tooltip
					label={`V2 Vaults fix the issue where users are unable to deposit into the rewards contract. Please migrate all funds from V1 to V2.`}
					fontSize="sm"
				>
					<IconButton
						ml={[0, 0, 2]}
						mr={[2, 2, 0]}
						aria-label="bVaultV2-info"
						size="xs"
						icon={<FaInfo />}
					/>
				</Tooltip>
			</Flex>

			<Stack direction={['column', 'column', 'row']} spacing={6}>
				{vaultsV2.map((vault, i) => (
					<VaultCard key={i} vault={vault} />
				))}
			</Stack>
		</Stack>
	);
};

export default Index;
