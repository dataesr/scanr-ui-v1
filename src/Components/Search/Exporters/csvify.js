function isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

export default function csfify(rows, columns) {
  let csv = '';
  const delimiter = '\t';
  if (columns) {
    csv += columns.map(c => c.trim().replace(/\t/g, ' ')).join(delimiter);
    csv += '\r\n';
  }
  rows.forEach((row) => {
    const crow = row.map((value) => {
      if (isString(value)) {
        return value
          .replace(/\t/g, ' ')
          .replace(/\r/g, ' ')
          .replace(/\n/g, ' ')
          .replace(/\s\s+/g, ' ')
          .trim();
      }
      return value;
    });
    csv += crow.join(delimiter);
    csv += '\r\n';
  });
  return csv;
}
