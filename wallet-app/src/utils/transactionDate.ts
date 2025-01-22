export const formatTransactionDate = (dateString: string): string => {
  const transactionDate = new Date(dateString);
  const today = new Date();

  const diffInDays = Math.floor(
    (today.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  if (diffInDays < 7) {
    return transactionDate.toLocaleDateString("en-US", { weekday: "long" });
  } else {
    return transactionDate.toLocaleDateString("en-US", options);
  }
};
