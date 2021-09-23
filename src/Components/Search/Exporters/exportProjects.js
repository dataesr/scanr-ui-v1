import Axios from 'axios';
import csvify from './csvify';

const projectToCSV = (query, data) => {
  const cols = [
    'Identifiant',
    'Label',
    'Type',
    'Date de début',
    'Date de fin',
    'Budget total',
    'Budget financé',
    'URL',
    'URL du project',
    'Nombre de participant',
    "Nom de l'appel à projet",
    "Label de l'action",
    'Durée',
    'Lien vers fiche scanR',
    "Date d'export",
    'Contexte de recherche',

  ];
  const rows = data.map(res => [
    res.value.id,
    res.value.label && (res.value.label.default || res.value.label.fr || res.value.label.en),
    res.value.type,
    res.value.startDate && new Date(res.value.startDate).toISOString(),
    res.value.endDate && new Date(res.value.endDate).toISOString(),
    res.value.budgetTotal,
    res.value.budgetFinanced,
    res.value.url,
    null,
    res.value.participantCount,
    res.value.call && res.value.call.label,
    res.value.action && res.value.action.label.default,
    res.value.duration,
    `https://scanr.enseignementsup-recherche.gouv.fr/project/${res.value.id}`,
    new Date().toISOString(),
    `https://scanr.enseignementsup-recherche.gouv.fr${query}`,
  ]);
  return new Blob([csvify(rows, cols)], { encoding: 'UTF-8', type: 'text/csv' });
};

export default async function exportProjects(url, context, contextUrl, filename) {
  const query = { ...context };
  delete query.aggregations;
  if (query.filters) {
    query.filters = JSON.parse(query.filters);
  }
  query.pageSize = 1000;
  query.sourceFields = ['id', 'label', 'budgetTotal', 'budgetFinanced', 'call', 'action', 'participantCount', 'startDate', 'endDate', 'duration', 'url', 'type'];
  const response = await Axios.post(url, query);
  const blob = projectToCSV(contextUrl, response.data.results);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
