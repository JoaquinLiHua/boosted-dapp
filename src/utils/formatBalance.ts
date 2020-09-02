import BN from "bignumber.js";

export const getDisplayBalance = (balance: BN, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BN(10).pow(decimals));
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4);
  } else {
    return displayBalance.toFixed(2);
  }
};

export const getFullDisplayBalance = (balance: BN, decimals = 18) => {
  return balance.dividedBy(new BN(10).pow(decimals)).toFixed();
};
