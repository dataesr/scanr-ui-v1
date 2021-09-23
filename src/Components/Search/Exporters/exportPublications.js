import Axios from 'axios';

const productionToCSV = (query, data) => {
  const cols = [
    'Identifiant',
    'Titre',
    'Résumé',
    'Nom des auteurs',
    'Editeur',
    'Revue',
    'ISSN',
    'Type',
    'isOA',
    'Date de publication',
    'Date de soumission',
    'Lien vers fiche scanR',
    "Date d'export",
    'Contexte de recherche',
  ].join(';');
  const values = data.map(res => [
    res.value.id,
    (res.value.title && res.value.title.default) && res.value.title.default.replace(/;|\n|\r/g, ' '),
    (res.value.summary && res.value.summary.default) && res.value.summary.default.replace(/;|\n|\r/g, ','),
    res.value.authors && res.value.authors.map(a => a.fullName).join('|').replace(/;|\n|\r/g, ' '),
    res.value.source && res.value.source.publisher,
    res.value.source && res.value.source.title,
    (res.value.source && res.value.source.journalIssns) && res.value.source.journalIssns.join('|'),
    res.value.type,
    res.value.isOa,
    res.value.publicationDate && new Date(res.value.publicationDate).toISOString(),
    res.value.submissionDate && new Date(res.value.submissionDate).toISOString(),
    `https://scanr.enseignementsup-recherche.gouv.fr/publication/${res.value.id}`,
    new Date().toISOString(),
    `https://scanr.enseignementsup-recherche.gouv.fr${query}`,
  ].join(';'));
  const csv = [cols, values.join('\n')].join('\n');
  return new Blob([csv], { encoding: 'UTF-8', type: 'text/csv' });
};

export default async function exportProductions(url, context, contextUrl, filename) {
  const query = { ...context };
  delete query.aggregations;
  if (query.filters) {
    query.filters = JSON.parse(query.filters);
  }
  query.pageSize = 1000;
  query.sourceFields = ['id', 'type', 'authors.fullName', 'productionType', 'title', 'subtitle', 'isOa', 'publicationDate', 'submissionDate', 'summary', 'source'];
  const response = await Axios.post(url, query);
  const blob = productionToCSV(contextUrl, response.data.results);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
