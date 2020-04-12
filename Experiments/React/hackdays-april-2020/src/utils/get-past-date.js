export default function getPastDate(NumOfDaysAgo = 1) {
  const date = new Date();
  date.setDate(date.getDate() - NumOfDaysAgo); // Sat Mar 28 2020 14:26:37 GMT-0400 (Eastern Daylight Time)
  const mmddyyyy = date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }); // 3/28/2020
  const withDashes = mmddyyyy.split('/').join('-'); // 3-28-2020
  return withDashes;
}