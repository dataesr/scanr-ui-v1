const fullNameCases = (fullName: string) => {
  let query = '';
  const firstName = fullName.substr(0, fullName.indexOf(' '));
  const lastName = fullName.substr(fullName.indexOf(' ') + 1);
  const firstNameSplitted = firstName.split('-');
  const letterFirstName = firstNameSplitted.length > 1 ? `${firstNameSplitted[0][0]}${firstNameSplitted[1][0]}` : `${firstName[0]}`;
  const cases = {
    0: () => `("${firstName} ${lastName}")`,
    1: () => `("${lastName} ${firstName}")`,
    2: () => `("${lastName} ${letterFirstName}")`,
    3: () => `("${letterFirstName} ${lastName}")`,
  };
  const keys = Object.keys(cases);

  for (let i = 0; i < keys.length; i += 1) {
    query += `${i > 0 ? '| ' : ''}${cases[i]()} `;
  }
  return query;
};

export function iDsFromFullNameCasesRequest(fullName: string) {
  return {
    pageSize: 1000,
    query: fullNameCases(fullName),
    searchFields: ['fullName'],
    sourceFields: ['id'],
  };
}

export function productionsWithoutIdsRequest(fullName: string, ids: Array, page: number, pageSize: number) {
  return {
    page: page || 0,
    pageSize,
    query: fullNameCases(fullName),
    searchFields: ['authors.fullName'],
    sort: { year: 'DESC' },
    sourceFields: [
      'id', 'keywordsEn', 'keywordsFr', 'title', 'subtitle', 'summary', 'authors', 'productionType',
      'alternativeSummary', 'source', 'oaEvidence', 'isOa', 'domains', 'type',
      'publicationDate', 'year', 'affiliations',
    ],
    filters: {
      productionType: {
        op: 'any',
        type: 'MultiValueSearchFilter',
        values: ['thesis', 'publication', 'patent'],
      },
      'authors.person.id': {
        type: 'MultiValueSearchFilter',
        op: 'not_all',
        values: ids,
      },
    },
  };
}
