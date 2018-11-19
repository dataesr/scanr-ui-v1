export default function age(birthDate, deathDate=null) {
  const birthday = new Date(birthDate);
  if(!deathDate){
    return new Number((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0);
  } else{
    const deathDay = new Date(deathDate);
    return new Number((deathDay.getTime() - birthday.getTime()) / 31536000000).toFixed(0);
  }
}
