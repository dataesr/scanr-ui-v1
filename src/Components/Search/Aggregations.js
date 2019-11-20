export const ProjectsAggregations = {
  types: {
    field: 'type',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 15,
  },
  years: {
    field: 'years',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 50,
  },
  localisations: {
    field: 'participants.structure.address.localisationSuggestions',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 1000,
  },
  domains: {
    field: 'action.label.default',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 500,
  },
};
export const StructuresAggregations = {};
export const PublicationsAggregations = {
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
  productionTypes: {
    field: 'productionType',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 4,
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
    size: 3,
  },
};
export const PersonsAggregations = {};
