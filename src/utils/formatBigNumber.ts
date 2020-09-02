import BN from "bignumber.js";

export const getNumber = (balance: BN) => {
  return balance.dividedBy(new BN(10).pow(0)).toFixed();
};
