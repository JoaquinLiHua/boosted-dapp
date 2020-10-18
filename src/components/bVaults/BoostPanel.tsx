// import {
//   Box,
//   Text,
//   Stack,
//   Flex,
//   Button,
//   NumberDecrementStepper,
//   NumberIncrementStepper,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
// } from "@chakra-ui/core";
// import BN from "bignumber.js";
// import React, { useState } from "react";
// import { boostToken } from "src/constants/bfAddresses";
// import { IVault } from "src/constants/bVaults";
// import { usePriceFeedContext } from "src/context/PriceFeedContext";
// import { useGetBoostedBalances } from "src/hooks/useBoostedBalances";
// import { useStakedAmount } from "src/hooks/useStakedAmount";
// import { useTokenBalance } from "src/hooks/useTokenBalance";
// import { getDisplayBalance } from "src/utils/formatBalance";

// interface BoostPanelProps {
//   vault: IVault;
// }

// export const BoostPanel: React.FC<BoostPanelProps> = ({ vault }) => {
//   const [requestedBoost, setRequestedBoost] = useState<boolean>(false);
//   const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
//   const { coinGecko }: { coinGecko: any } = usePriceFeedContext();
//   // const [currentBoostedBalance, nextBoostedBalance] = useGetBoostedBalances(
//   //   vault.address
//   // );
//   const boostBalance: BN = useTokenBalance(boostToken);

//   const handleBoost = () => {
//     setRequestedBoost(true);
//   };

//   const handleApprove = () => {
//     setRequestedApproval(true);
//   };

//   return (
//     <Stack spacing={8}>
//       <Box mt={4} fontWeight="bold" fontSize="lg" textTransform="uppercase">
//         Purchase a BOOSTER to increase your rewards.
//       </Box>

//       <Flex justifyContent="space-between">
//         <Text fontWeight="bold">BOOST Balance</Text>
//         <Text textAlign="right">{getDisplayBalance(boostBalance)} BOOST</Text>
//       </Flex>
//       <Flex justifyContent="space-between">
//         <Text fontWeight="bold">Cost of BOOSTER</Text>
//         {/* <Text textAlign="right">
//           {vault.boosterPrice ? getDisplayBalance(vault.boosterPrice) : 0} BOOST
//         </Text> */}
//       </Flex>
//       <Flex justifyContent="space-between">
//         <Text fontWeight="bold">Cost of BOOSTER (USD)</Text>
//         {/* <Text textAlign="right">${formatCurrency(usdBoosterPrice)}</Text> */}
//       </Flex>
//       <Flex justifyContent="space-between">
//         <Text fontWeight="bold">BOOSTERS currently active</Text>
//         {/* <Text textAlign="right">{boosterBalance.toNumber()}</Text> */}
//       </Flex>
//       <Flex justifyContent="space-between">
//         <Text fontWeight="bold">Current BOOSTED stake value</Text>
//         {/* <Text textAlign="right">
//           {currentBoostedBalance.div(1e18).toNumber()}{" "}
//           {vault.vaultTokenTicker.toUpperCase()}
//         </Text> */}
//       </Flex>
//       <Flex justifyContent="space-between">
//         <Text fontWeight="bold">Staked value after next BOOSTER</Text>
//         {/* <Text textAlign="right">
//           {nextBoostedBalance.div(1e18).toNumber()}{" "}
//           {vault.vaultTokenTicker.toUpperCase()}
//         </Text> */}
//       </Flex>
//       {/* {nextBoostAvailable.toNumber() !== 0 && (
//         <Flex justifyContent="space-between">
//           <Text fontWeight="bold">BOOSTING unlocked after</Text>
//           <Text textAlign="right">
//             {formatTimestamp(nextBoostAvailable.toNumber())}
//           </Text>
//         </Flex>
//       )} */}
//       <Text fontSize="sm" my={2} textAlign="center">
//         BOOSTING will automatically claim your available rewards.
//       </Text>
//       {/* {!allowance.toNumber() ? (
//         <Button
//           colorScheme="blue"
//           isLoading={requestedApproval}
//           disabled={requestedApproval}
//           onClick={() => handleApprove()}
//         >
//           {requestedApproval ? "Approving..." : "Approve BOOST"}
//         </Button>
//       ) : (
//         <Button
//           colorScheme="blue"
//           isLoading={requestedBoost}
//           disabled={
//             boostBalance.toNumber() <
//               (vault.boosterPrice?.toNumber() ?? 99999) ||
//             new Date() <= new Date(nextBoostAvailable.toNumber() * 1000) ||
//             requestedBoost
//           }
//           onClick={() => handleBoost()}
//         >
//           {boostBalance.toNumber() < (vault.boosterPrice?.toNumber() ?? 99999)
//             ? "Insufficient Balance"
//             : requestedBoost
//             ? "Boosting..."
//             : "Buy BOOSTER"}
//         </Button>
//       )} */}
//     </Stack>
//   );
// };
