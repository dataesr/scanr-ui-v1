export default {
  pageSize: 5000,
  query: '',
  sourceFields: [
    'id', 'keywords', 'label', 'acronym', 'domains', 'type',
    'participantCount', 'call', 'action', 'year', 'description',
  ],
  filters: {
    startDate: {
      type: 'DateRangeFilter',
      max: null,
      min: null,
      missing: true,
    },
    'participants.structure.id': {
      type: 'MultiValueSearchFilter',
      op: 'any',
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
    partcount: {
      field: 'participantCount',
      filters: {},
      min_doc_count: 1,
      order: {
        direction: 'DESC',
        type: 'COUNT',
      },
      size: 50,
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
