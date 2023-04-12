export default function transformAuthors(el) {
  if (el.fullName !== 'Théo Golvet') return el;
  return {
    firstName: 'Aliénor', lastName: 'Golvet', fullName: 'Aliénor Golvet', role: 'author',
  };
}
