export function parseDateInt(dateString: string) {
  const date = dateString.split('-');
  const dateInt = parseInt(`${date[0]}${date[1]}${date[2]}`);
  return dateInt;
}

export function parseDateString(dateInt: number) {
  const string = String(dateInt);
  let dateString = '';
  for (let i = 0; i < string.length; i++) {
    if (i === 4 || i === 6) dateString = dateString + '-';
    dateString = dateString + string[i];
  }
  return dateString + 'T12:00:00-05:00';
}

export function parseCents(amount: string) {
  return parseInt(amount.split('.')[0]) * 100 + parseInt(amount.split('.')[1]);
}
