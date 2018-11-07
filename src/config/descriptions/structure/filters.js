export default [
  {
    title: 'Statut',
    checkboxes: [
      {
        label: 'Active',
        name: 'status',
        value: 'active',
      },
      {
        label: 'Non active',
        name: 'status',
        value: 'old',
      },
    ],
  },
  {
    title: 'Conflit',
    checkboxes: [
      {
        label: 'Nom',
        name: 'names.status',
        value: 'conflict',
      },
      {
        label: 'Adresse',
        name: 'addresses.status',
        value: 'conflict',
      },
    ],
  },
];
