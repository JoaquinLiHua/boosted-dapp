import { useCallback, useEffect, useState } from "react";
import { provider } from "web3-core";

declare global {
  interface Window {
    ethereum: provider;
  }
}

export const useWeb3Presence = () => {
  const [present, setPresent] = useState<boolean>(false);
  const fetchWeb3Presence = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      setPresent(true);
    } else {
      setPresent(false);
    }
  }, []);

  useEffect(() => {
    fetchWeb3Presence();
    const refreshInterval = setInterval(fetchWeb3Presence, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchWeb3Presence]);

  return present;
};
