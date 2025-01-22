export const calculateDailyPoints = (today: Date): number => {
  const seasonStart = new Date(today.getFullYear(), 8, 1);
  const dayOfSeason =
    Math.ceil(
      (today.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  if (dayOfSeason <= 1) {
    return 2;
  } else if (dayOfSeason === 2) {
    return 3;
  } else {
    const previousDayPoints = calculateDailyPoints(
      new Date(today.setDate(today.getDate() - 1))
    );
    const dayBeforePrevious = calculateDailyPoints(
      new Date(today.setDate(today.getDate() - 1))
    );
    return Math.floor(previousDayPoints * 0.6 + dayBeforePrevious * 1.0);
  }
};
