import React from 'react';
import { Alert, AlertIcon, Heading, Link, Stack } from '@chakra-ui/react';
import { VaultCard } from 'components/bVaults/VaultCard';
import { useVaultContext } from 'context/VaultContext';

const Index: React.FC = () => {
	const { vaults } = useVaultContext();
	return (
		<Stack spacing={4} mt={4} width="100%">
			<Heading>bVaults</Heading>
			<Alert status="info">
				<AlertIcon />
				<span>
					Please withdraw and deposit into bVaults V2{' '}
					<Link href="/bVaultsV2">
						<span style={{ textDecoration: 'underline', cursor: 'pointer' }}>here</span>
					</Link>
				</span>
			</Alert>
			<Stack direction={['column', 'column', 'row']} spacing={6}>
				{vaults.map((vault, i) => (
					<VaultCard key={i} vault={vault} />
				))}
			</Stack>
		</Stack>
	);
};

export default Index;
