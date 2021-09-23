import Axios from 'axios';
import csvify from './csvify';

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
  ];
  const rows = data.map(res => [
    res.value.id,
    (res.value.title && res.value.title.default) && res.value.title.default,
    (res.value.summary && res.value.summary.default) && res.value.summary.default,
    res.value.authors && res.value.authors.map(a => a.fullName).join(';'),
    res.value.source && res.value.source.publisher,
    res.value.source && res.value.source.title,
    (res.value.source && res.value.source.journalIssns) && res.value.source.journalIssns.join(';'),
    res.value.type,
    res.value.isOa,
    res.value.publicationDate && new Date(res.value.publicationDate).toISOString(),
    res.value.submissionDate && new Date(res.value.submissionDate).toISOString(),
    `https://scanr.enseignementsup-recherche.gouv.fr/publication/${res.value.id}`,
    new Date().toISOString(),
    `https://scanr.enseignementsup-recherche.gouv.fr${query}`,
  ]);
  return new Blob([csvify(rows, cols)], { encoding: 'UTF-8', type: 'text/csv' });
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
