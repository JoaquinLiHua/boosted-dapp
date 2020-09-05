import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/core";
import { IPool } from "src/context/PoolContext";
import { StakingPanel } from "./StakingPanel";
import { RewardsPanel } from "./RewardsPanel";
import { BoostPanel } from "./BoostPanel";

interface TransactionModalProps {
  pool: IPool | null;
  onClose: Function;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  pool,
  onClose,
}) => {
  if (pool) {
    return (
      <Modal onClose={() => onClose(false)} isOpen={true} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{pool.name} Staking Pool</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Staking</Tab>
                  <Tab>Rewards</Tab>
                  <Tab>Booster</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <StakingPanel pool={pool} />
                  </TabPanel>
                  <TabPanel>
                    <RewardsPanel pool={pool} />
                  </TabPanel>
                  <TabPanel>
                    <BoostPanel pool={pool} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );
  } else {
    return null;
  }
};
