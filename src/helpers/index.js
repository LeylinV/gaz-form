const weekDays = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];

export function formatDateVal(val) {
  return val < 10 ? `0${val}` : val;
}

export function isHoliday(weekday) {
  return [0, 6].includes(weekday);
}

export function getPrettyDate(date) {
  if(!date) return date;
  const format = formatDateVal;
  const day = format(date.getDate());
  const month = format(date.getMonth() + 1);
  const year = date.getFullYear();
  const weekName = weekDays[date.getDay()];

  const dateStr = `${day}.${month}.${year}`;

  return {
    label: `${weekName} ${dateStr}`,
    value: dateStr,
  };
}

export function getDayOfYear(date) {
  const [day, month, year] = date.split('.');
  const dateCurrent = new Date(`${year}-${month}-${day}`);
  const start = new Date(dateCurrent.getFullYear(), 0, 0);
  const diff = dateCurrent - start;
  const aDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / aDay);
  return dayOfYear < 10 ? `00${dayOfYear}` : `0${dayOfYear}`;
}

export function getTimes() {
  return [
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
  ];
}
