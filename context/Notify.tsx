import { TransactionData } from 'bnc-notify';

import Initialiser from 'context/Initialiser';
import { createContainer } from 'unstated-next';

export interface TransactionFailed extends TransactionData {
	failureReason: string;
}

const useNotify = () => {
	const { bncNotify } = Initialiser.useContainer();

	const monitorHash = ({
		txHash,
		onTxConfirmed,
		onTxFailed,
	}: {
		txHash: string;
		onTxConfirmed?: (txData: TransactionData) => void;
		onTxFailed?: (txData: TransactionFailed) => void;
	}) => {
		if (bncNotify) {
			const { emitter } = bncNotify.hash(txHash);

			const link = `https://etherscan.io/tx/${txHash}`;

			emitter.on('txConfirmed', (txData: any) => {
				if (onTxConfirmed != null) {
					onTxConfirmed(txData);
				}
				return {
					autoDismiss: 0,
					link,
				};
			});
			emitter.on('txFailed', (txData: any) => {
				if (onTxFailed != null) {
					onTxFailed(txData as TransactionFailed);
				}
				return {
					link,
				};
			});

			emitter.on('all', () => {
				return {
					link,
				};
			});
		}
	};
	return {
		monitorHash,
	};
};

const Notify = createContainer(useNotify);

export default Notify;
