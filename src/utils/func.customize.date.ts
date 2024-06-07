export const convertDateCol = (dateInput: string) => {
  const date = new Date(dateInput);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  return formattedDate;
};
