function getExternalInfos(id: string, type: string) {
  const result = { name: 'Identifiant', link: '#' };
  let substring = id;
  if (type === 'publication') {
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
  } else if (type === 'thesis') {
    substring = id.substring(5);
    result.name = 'theses';
    result.link = 'https://theses.fr/'.concat({ substring }.substring);
  }
  return result;
}

export default getExternalInfos;
