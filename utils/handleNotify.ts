export function notifyHandler(notify, hash) {
	const { emitter } = notify.hash(hash);
	emitter.on('all', (transaction) => ({
		onclick: () =>
			window.open(`https://etherscan.io/tx/${transaction.hash}`, '_blank', 'noopener, norefferer'),
	}));
}
