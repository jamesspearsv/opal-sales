/**
 * Parse a date integer from a date string in YYYY-MM-DD format
 * @param dateString
 * @returns
 */
export function parseDateInt(dateString: string) {
  const date = dateString.split('-');
  const dateInt = parseInt(`${date[0]}${date[1]}${date[2]}`);
  return dateInt;
}

/**
 * Parse a date in YYYY-MM-DD format from a formatted date integer
 * @param dateInt
 * @returns
 */
export function parseDateString(dateInt: number) {
  const string = String(dateInt);
  let dateString = '';
  for (let i = 0; i < string.length; i++) {
    if (i === 4 || i === 6) dateString = dateString + '-';
    dateString = dateString + string[i];
  }
  return dateString + ' ' + '16:00:00.000Z';
}

/**
 * Parse the total number of cents from a formatted price string
 * @param amount
 * @returns
 */
export function parseCents(amount: string) {
  return parseInt(amount.split('.')[0]) * 100 + parseInt(amount.split('.')[1]);
}
