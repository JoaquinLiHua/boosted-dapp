import React, { useState } from "react";
import { Stack, Box, Flex } from "@chakra-ui/core";
import { StatBox } from "./StatBox";
import { boostToken } from "../constants/tokenAddresses";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { useTotalSupply } from "src/hooks/useTotalSupply";
import { useTreasuryBalance } from "src/hooks/useTreasuryBalance";
import { useTotalValueLocked } from "src/hooks/useTotalValueLocked";
import { IPool } from "src/context/PoolContext";
import { TableUI } from "./TableUI";
import { TransactionModal } from "./TransactionModal";
import formatCurrency from "format-currency";

export const Main: React.FC = () => {
  const [showTransactionModal, setShowTransactionModal] = useState<boolean>(
    false
  );
  const [pool, setPool] = useState<IPool | null>(null);
  const boostBalance = useTokenBalance(boostToken);
  const boostTotalSupply = useTotalSupply();
  const treasuryBalance = useTreasuryBalance();
  const totalValueLocked = useTotalValueLocked();
  const handleShowTransactionModal = (pool: IPool) => {
    setShowTransactionModal(true);
    setPool(pool);
  };
  return (
    <>
      {showTransactionModal && (
        <TransactionModal pool={pool} onClose={setShowTransactionModal} />
      )}
      <Flex justifyContent="space-between" width="100%">
        <Stack spacing="1.5rem" mr="4" mt="4" flex={1}>
          <StatBox
            title="BALANCE"
            value={boostBalance}
            bigNumber
            tokenTicker={"BOOST"}
          />
          <StatBox
            title="TOTAL VALUE LOCKED"
            tokenTicker={"USD"}
            value={formatCurrency(totalValueLocked)}
          />
          <StatBox title="B00ST PRICE" tokenTicker={"BOOST"} />
          <StatBox
            title="TOTAL SUPPLY"
            bigNumber
            value={boostTotalSupply}
            tokenTicker={"BOOST"}
          />
          <StatBox
            title="TREASURY VALUE"
            bigNumber
            tokenTicker={"YCRV"}
            value={treasuryBalance}
          />
        </Stack>
        <Box flex={4}>
          <TableUI setShowTransactionModal={handleShowTransactionModal} />
        </Box>
      </Flex>
    </>
  );
};
