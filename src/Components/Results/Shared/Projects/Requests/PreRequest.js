export default {
  pageSize: 1,
  filters: {
    'participants.structure.id': {
      type: 'MultiValueSearchFilter',
      op: 'any',
      values: [],
    },
  },
  aggregations: {
    years: {
      field: 'year',
      filters: {},
      min_doc_count: 1,
      order: {
        direction: 'DESC',
        type: 'COUNT',
      },
      size: 100,
    },
    types: {
      field: 'type',
      filters: {},
      min_doc_count: 1,
      order: {
        direction: 'DESC',
        type: 'COUNT',
      },
      size: 100,
    },
  },
};
