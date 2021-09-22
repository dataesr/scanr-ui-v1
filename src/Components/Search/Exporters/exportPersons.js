import Axios from 'axios';

const personsToCSV = (query, data) => {
  const cols = [
    'Identifiant',
    'Prénom',
    'Nom',
    'Nom complet',
    'Domaine label',
    'Lien vers fiche scanR',
    "Date d'export",
    'Contexte de recherche',
  ].join(';');
  const values = data.map(res => [
    res.value.id,
    res.value.firstName || null,
    res.value.lastName || null,
    [res.value.firstName || undefined, res.value.lastName || undefined].join(' '),
    res.value.keywords && res.value.keywords.fr.join('|'),
    `https://scanr.enseignementsup-recherche.gouv.fr/person/${res.value.id}`,
    new Date().toISOString(),
    `https://scanr.enseignementsup-recherche.gouv.fr${query}`,
  ].join(';'));
  const csv = [cols, values.join('\n')].join('\n');
  return new Blob([csv], { encoding: 'UTF-8', type: 'text/csv' });
};

export default async function exportPersons(url, context, contextUrl, filename) {
  const query = { ...context };
  delete query.aggregations;
  if (query.filters) {
    query.filters = JSON.parse(query.filters);
  }
  query.pageSize = 1000;
  query.sourceFields = ['id', 'fullName', 'firstName', 'lastName', 'keywords'];
  const response = await Axios.post(url, query);
  const blob = personsToCSV(contextUrl, response.data.results);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
