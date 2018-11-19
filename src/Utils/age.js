export default function age(birthDate, deathDate) {
  const birthday = new Date(birthDate);
  let comparisonDate = new Date();
  if (deathDate) {
    comparisonDate = new Date(deathDate);
  }
  return ((comparisonDate.getTime() - birthday.getTime()) / 31536000000).toFixed(0);
}
