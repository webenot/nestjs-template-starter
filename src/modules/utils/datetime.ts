export const delay = async (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const getPreviousDateByDays = (days = 1): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const getFirstDayOfNextMonth = (): Date => {
  const date = new Date();
  return new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
};

export const getLastDayOfNextMonth = (): Date => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 2, 0);
};
