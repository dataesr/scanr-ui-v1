import getSelectKey from '../../../../../Utils/getSelectKey';

const columnNames = {
  fr: [
    { id: 'ID', displayName: 'ID' },
    { id: 'label', displayName: 'Label' },
    { id: 'acronym', displayName: 'Acronyme' },
    { id: 'type', displayName: 'Type de financement' },
    { id: 'participantCount', displayName: 'Nombre de participants' },
    { id: 'participantsNames', displayName: 'Nom des participants' },
    { id: 'participantsIDs', displayName: 'ID des participants' },
    { id: 'budgetTotal', displayName: 'Budget total du projet' },
    { id: 'budgetFinanced', displayName: 'Budget du projet financé par l\'opérateur' },
    { id: 'year', displayName: 'Année' },
    { id: 'description', displayName: 'Description' },
    { id: 'duration', displayName: 'Durée en mois' },
  ],
  en: [
    { id: 'ID', displayName: 'ID' },
    { id: 'label', displayName: 'Label' },
    { id: 'acronym', displayName: 'Acronym' },
    { id: 'type', displayName: 'Funding type' },
    { id: 'participantCount', displayName: 'Number of participants' },
    { id: 'participantsNames', displayName: 'Name of participants' },
    { id: 'participantsIDs', displayName: 'ID of participants' },
    { id: 'budgetTotal', displayName: 'Total budget' },
    { id: 'budgetFinanced', displayName: 'Financed budget' },
    { id: 'year', displayName: 'Year' },
    { id: 'description', displayName: 'Description' },
    { id: 'duration', displayName: 'Duration (in month)' },
  ],
};

export default function projectCsvExporter(data, lang) {
  const csvData = [];
  const csvColumns = columnNames[lang];
  data.forEach((item) => {
    const project = item.value;
    const participantsNames = project.participants.map(
      participant => (
        getSelectKey(participant.structure, 'label', lang, 'default') || getSelectKey(participant, 'label', lang, 'default')
      ),
    ).join(';');
    const flatProject = {
      ID: project.id,
      label: getSelectKey(project, 'label', lang, 'default'),
      acronym: getSelectKey(project, 'acronym', lang, 'default'),
      type: project.type,
      participantCount: project.participantCount,
      participantsNames,
      participantsIDs: project.participants.map(
        participant => participant.structure && participant.structure.id,
      ).join(';'),
      budgetTotal: project.budgetTotal,
      budgetFinanced: project.budgetFinanced,
      year: project.year,
      description: getSelectKey(project, 'description', lang, 'default'),
      duration: project.duration,
    };
    csvData.push(flatProject);
  });
  return { csvColumns, csvData };
}
