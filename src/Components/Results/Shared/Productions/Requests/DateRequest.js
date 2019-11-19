export default {
  pageSize: 0,
  query: '',
  filters: {
    productionType: {
      type: 'MultiValueSearchFilter',
      op: 'all',
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
  },
};
