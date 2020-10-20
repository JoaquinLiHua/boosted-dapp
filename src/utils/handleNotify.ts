export function notifyHandler(notify, hash) {
  console.log(hash);
  let { emitter } = notify.hash(hash);
  console.log(emitter);
  emitter.on("all", (transaction) => ({
    onclick: () =>
      window.open(
        `https://etherscan.io/tx/${transaction.hash}`,
        "_blank",
        "noopener, norefferer"
      ),
  }));
}
