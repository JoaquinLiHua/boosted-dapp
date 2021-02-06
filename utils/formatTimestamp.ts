export const formatTimestamp = (unixTimestamp: number) => {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const date = new Date(unixTimestamp * 1000);

  return date.toLocaleString();
};
