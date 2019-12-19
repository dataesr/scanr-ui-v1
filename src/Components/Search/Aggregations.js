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
export const StructuresAggregations = {
  localisations: {
    field: 'address.localisationSuggestions',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 1000,
  },
  kind: {
    field: 'kind',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 50,
  },
  projectTypes: {
    field: 'projects.project.type',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 50,
  },
  tutelles: {
    field: 'institutions.structure.label.fr',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 1500,
  },
  level: {
    field: 'level',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 1500,
  },
  badgesfr: {
    field: 'badges.label.fr',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 20,
  },
  badgesen: {
    field: 'badges.label.en',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 20,
  },
};
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
    size: 1000,
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
export const PersonsAggregations = {
  awards: {
    field: 'awards.label',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 50,
  },
  roles: {
    field: 'roles.role',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 50,
  },
  affiliations: {
    field: 'affiliations.structure.label.fr',
    filters: {},
    min_doc_count: 1,
    order: {
      direction: 'DESC',
      type: 'COUNT',
    },
    size: 3000,
  },
};
