import { dayNames } from "../constants/DayNames.constant";

// Get the day of the given date and use the day number to assign class. For easier day recognition. //
export const getDayFromDate = (date: any) => {
  const dateObject = new Date(date);
  const day = dateObject.getDay() + 1;

  return day;
};
export const getDayNameFromDate = (date: any) => {
  const dateNumber = getDayFromDate(date);

  return dayNames[dateNumber];
};

// Change ISO date to a more readable date. //
export const changeToLocaleDate = (dateToChange: any) => {
  const dateObject = new Date(dateToChange);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return dateObject.toLocaleString(undefined, options);
};

// Get a date string and turn it into ISO date. //
export const changeToDate = (dateToChange: any) => {
  return new Date(dateToChange);
};

// Get the amount of date between 2 dates. //
export const getDayAmountBetweenDates = (date1: string, date2: string) => {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // Convert both dates to UTC to handle time zone differences correctly. //
  const startUTC = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const endUTC = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );

  // Calculate the difference in days. //
  // Add 1 to count the first day as well. //
  const daysDifference =
    Math.floor((endUTC - startUTC) / (1000 * 60 * 60 * 24)) + 1;

  return daysDifference;
};
