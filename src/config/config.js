export const version = '1.0';

/* Pagination */
export const PAGINATION_FROM = 0;
export const PAGINATION_STEP = 20;

/* Statuts */
export const STATUS_ARRAY = ['valid', 'invalid', 'old', 'main'];
export const STATUS_MAIN = 'main';
export const STATUS_VALID = 'valid';
export const STATUS_INVALID = 'invalid';
export const STATUS_OLD = 'old';

/* API */
export const API_END_POINT = 'http://10.243.98.15:5000/rnsr/';
export const API_BOUCHON = true;
export const API_DATA = {
  n_hits: 123,
  data: [
    {
      _cls: 'Entities.Structures',
      acronym: [
        {
          source: 'rnsr',
          status: 'main',
          value: 'FR2863',
        },
      ],
      activities: [
        {
          end_date: '2008-01-01T00:00:00',
          source: 'DS',
          start_date: '2005-01-01T00:00:00',
          status: 'valid',
          value: "Sciences pour l'ingenieur",
        },
      ],
      addresses: [
        {
          geocoded: false,
          source: 'rnsr',
          status: 'main',
          value: 'ENSIC -INPL, 1 RUE GRANDVILLE, BP 451, 54001, NANCY CEDEX',
        },
      ],
      badges: [],
      code_number: [
        'FR2863',
      ],
      created: '2018-07-03T14:21:01.317000',
      description: [],
      end_date: '2008-01-01T00:00:00',
      evaluation: [],
      exernal_ids: [],
      id: '200510689B',
      label: [
        {
          source: 'rnsr',
          status: 'main',
          value: "FEDERATION DE RECHERCHE JACQUES VILLERMAUX POUR LA MECANIQUE, L'ENERGIE, LES PROCEDES",
        },
        {
          source: 'rnsr',
          status: 'old',
          value: 'FEDERATION JACQUES VILLERMAUX',
        },
      ],
      last_api_update: '2008-12-12T12:13:51',
      last_update: '2018-07-03T14:21:01.317000',
      links: [],
      mail: 'tondeur@ensic.inpl-nancy.fr',
      parents: [],
      phone: '03 83 17 51 90',
      predecessors: [],
      social_media: [],
      start_date: '2005-01-01T00:00:00',
      status: 'old',
      supervisors: [
        {
          code_number: 'FR2863',
          dates: [
            {
              last_update: '2008-12-12T12:13:51',
              source: 'rnsr',
              value: {
                end_date: '2008-01-01T00:00:00',
                start_date: '2005-01-01T00:00:00',
                status: 'valid',
              },
            },
          ],
          label: 'Universite Henri Poincare Nancy 1',
          last_update: '2008-12-12T12:13:51',
          rnsr_key: 102,
          source: 'rnsr',
          status: 'valid',
          supervision_type: 6,
        },
        {
          code_number: 'FR2863',
          dates: [
            {
              last_update: '2008-12-12T12:13:51',
              source: 'rnsr',
              value: {
                end_date: '2008-01-01T00:00:00',
                start_date: '2005-01-01T00:00:00',
                status: 'valid',
              },
            },
          ],
          label: 'Institut National Polytechnique Lorraine Nancy',
          last_update: '2008-12-12T12:13:51',
          rnsr_key: 104,
          source: 'rnsr',
          status: 'valid',
          supervision_type: 6,
        },
        {
          code_number: 'FR2863',
          dates: [
            {
              last_update: '2008-12-12T12:13:51',
              source: 'rnsr',
              value: {
                end_date: '2008-01-01T00:00:00',
                start_date: '2005-01-01T00:00:00',
                status: 'valid',
              },
            },
          ],
          label: 'Centre national de la recherche scientifique',
          last_update: '2008-12-12T12:13:51',
          rnsr_key: 301,
          source: 'rnsr',
          status: 'valid',
          supervision_type: 6,
          value: '180089013',
        },
      ],
      topics: [],
    },
  ],
};
