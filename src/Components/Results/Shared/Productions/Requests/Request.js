export default {
  pageSize: 500,
  query: '',
  sourceFields: [
    'id', 'keywordsEn', 'keywordsFr', 'title', 'subtitle', 'summary', 'authors', 'productionType',
    'alternativeSummary', 'source', 'oaEvidence', 'isOa', 'domains', 'type',
    'publicationDate', 'year',
  ],
  filters: {
    publicationDate: {
      type: 'DateRangeFilter',
      max: null,
      min: null,
      missing: false,
    },
    productionType: {
      type: 'MultiValueSearchFilter',
      op: 'all',
      values: [],
    },
  },
  aggregations: {
    types: {
      field: 'type',
      filters: {},
      min_doc_count: 1,
      order: {
        direction: 'DESC',
        type: 'COUNT',
      },
      size: 50,
    },
    keywordsEn: {
      field: 'keywords.en',
      filters: {},
      min_doc_count: 1,
      order: {
        direction: 'DESC',
        type: 'COUNT',
      },
      size: 100,
    },
    keywordsFr: {
      field: 'keywords.fr',
      filters: {},
      min_doc_count: 1,
      order: {
        direction: 'DESC',
        type: 'COUNT',
      },
      size: 100,
    },
    journal: {
      field: 'source.title',
      filters: {},
      min_doc_count: 1,
      order: {
        direction: 'DESC',
        type: 'COUNT',
      },
      size: 10,
    },
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
    isOa: {
      field: 'isOa',
      filters: {},
      min_doc_count: 1,
      order: {
        direction: 'DESC',
        type: 'COUNT',
      },
      size: 10,
    },
  },
};
