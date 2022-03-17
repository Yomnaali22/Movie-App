// Convert time to hours and minutes
export const calcTime = (time: number): string => {
  const hours: number = Math.floor(time / 60);
  const mins: number = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = (money: number): string => {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};

//getting state from sessionStorage
export const isPresistedState = (stateName: string): any => {
  const sessionState = sessionStorage.getItem(stateName);
  //check if state exist and then parse to json if true
  return sessionState && JSON.parse(sessionState);
};

export const generate_id = (themovieId: number) => {
  const id = Math.floor(Math.random() * themovieId);
  return id;
};
