import Axios from 'axios';
import csvify from './csvify';

const structureToCSV = (query, data) => {
  const cols = [
    'Identifiant',
    'Label',
    'Acronyme',
    'Nature',
    'Code postal',
    'Ville',
    'Site internet',
    'Lien vers fiche scanR',
    "Date d'export",
    'Contexte de recherche',
  ];
  const rows = data.map((res) => {
    const address = res.value.address ? res.value.address.filter(a => a.main) : [];
    const link = res.value.links ? res.value.links.filter(l => l.type === 'main') : [];
    return [
      res.value.id,
      res.value.label && (res.value.label.default || res.value.label.fr),
      res.value.acronym && (res.value.acronym.default || res.value.acronym.fr),
      res.value.nature,
      address.length && address[0].postcode,
      address.length && address[0].city,
      link.length && link[0].url,
      `https://scanr.enseignementsup-recherche.gouv.fr/entite/${res.value.id}`,
      new Date().toISOString(),
      `https://scanr.enseignementsup-recherche.gouv.fr${query}`,
    ];
  });
  return new Blob([csvify(rows, cols)], { encoding: 'UTF-8', type: 'text/csv' });
};

export default async function exportStructures(url, context, contextUrl, filename) {
  const query = { ...context };
  delete query.aggregations;
  if (query.filters) {
    query.filters = JSON.parse(query.filters);
  }
  query.pageSize = 500;
  query.sourceFields = ['id', 'label', 'acronym', 'nature', 'address', 'links'];
  const response = await Axios.post(url, query);
  const blob = structureToCSV(contextUrl, response.data.results);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
