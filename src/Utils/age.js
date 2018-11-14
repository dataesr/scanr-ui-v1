export default function age(date) {
  const birthday = new Date(date);
  return new Number((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0);
}
