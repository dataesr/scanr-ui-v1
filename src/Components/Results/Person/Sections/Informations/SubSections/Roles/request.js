export default idref => ({
  query: '',
  lang: 'fr',
  page: '0',
  pageSize: '20',
  searchFields: [
    'label',
  ],
  sourceFields: [
    'label',
    'id',
    'leaders',
  ],
  sort: {
    label: 'ASC',
    _score: 'DESC',
  },
  filters: {
    'leaders.person.id': {
      type: 'MultiValueSearchFilter',
      op: 'all',
      values: [
        idref,
      ],
    },
  },
});
