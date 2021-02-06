import React from 'react';
import { useRouter } from 'next/router';
import {
	Stack,
	Heading,
	Tabs,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Flex,
	Image,
} from '@chakra-ui/react';
import { usePoolContext } from 'context/PoolContext';
import { StakePanel } from 'components/pools/StakePanel';
import { BoostPanel } from 'components/pools/BoostPanel';

const Pool: React.FC = () => {
	const router = useRouter();
	const { id } = router.query;
	const { openPools } = usePoolContext();

	const currentPool = openPools.filter((e) => e.code === id)[0];

	if (id && openPools) {
		return (
			<Stack mt={4} width="100%" p={4} borderWidth={1} borderRadius={5}>
				<Flex alignItems="center">
					<Image src={currentPool.icon} width="10" height="10" />
					<Heading fontSize="lg" p={4}>
						{currentPool.name} Pool
					</Heading>
				</Flex>
				<Tabs>
					<TabList>
						<Tab>Staking</Tab>
						<Tab>Boosting</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<StakePanel pool={currentPool} />
						</TabPanel>
						<TabPanel>
							<BoostPanel pool={currentPool} />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Stack>
		);
	} else {
		return <></>;
	}
};

export default Pool;
