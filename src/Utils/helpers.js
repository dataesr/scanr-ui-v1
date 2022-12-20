function getExternalInfos(id: string, type: string) {
  const result = { name: 'Identifiant', link: '#' };
  if (type === 'publication') {
    result.link = '#';
  }
  let substring = id;
  if (id.substring(0, 3) === 'doi') {
    result.name = 'DOI';
    substring = id.substring(3);
    result.link = 'http://doi.org/'.concat({ substring }.substring);
  } else if (id.substring(0, 5) === 'sudoc') {
    result.name = 'Sudoc';
    substring = id.substring(5);
    result.link = 'http://www.sudoc.fr/'.concat({ substring }.substring);
  } else if (id.substring(0, 3) === 'hal') {
    result.name = 'HAL';
    substring = id.substring(3);
    result.link = 'https://hal.archives-ouvertes.fr/'.concat({ substring }.substring);
  } else if (id.substring(0, 3) === 'nnt') {
    substring = id.substring(3).toUpperCase();
    result.name = 'thèse';
    result.link = 'https://theses.fr/'.concat({ substring }.substring);
  }
  return result;
}

export default getExternalInfos;
