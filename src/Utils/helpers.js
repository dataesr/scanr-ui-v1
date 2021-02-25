function getExternalInfos(id: string) {
  const result = { name: 'Identifiant', link: '#' };
  let substring = id;

  if (id.substring(0, 3) === 'doi') {
    result.name = 'DOI';
    substring = id.substring(3);
    result.link = 'http://doi.org/'.concat({ substring }.substring);
  } else if (id.substring(0, 5) === 'sudoc') {
    result.name = 'Sudoc';
    substring = id.substring(5);
    result.link = 'http://www.sudoc.fr/'.concat({ substring }.substring);
  } else if (id.substring(0, 6) === 'dumas-') {
    result.name = 'HAL';
    result.link = 'https://dumas.ccsd.cnrs.fr/'.concat({ id }.id);
  } else {
    result.name = 'HAL';
    result.link = 'https://hal.archives-ouvertes.fr/'.concat({ id }.id);
  }
  return result;
}

export default getExternalInfos;
