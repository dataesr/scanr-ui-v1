// api du site
export const API_BASE_SCANR = process.env.REACT_APP_API_BASE_SCANR;
export const API_FOCUS_SCANR = API_BASE_SCANR.concat('/focus');
export const API_CONTRIBUTE_SCANR = API_BASE_SCANR.concat('/contribute');
export const API_CONTACT_SCANR = API_BASE_SCANR.concat('/contact');
export const API_ERRORS_SCANR = API_BASE_SCANR.concat('/errors');

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// Get
export const API_STRUCTURES_END_POINT = API_BASE_URL.concat('/structures');
export const API_PUBLICATIONS_END_POINT = API_BASE_URL.concat('/publications');
export const API_PROJECTS_END_POINT = API_BASE_URL.concat('/projects');
export const API_PERSONS_END_POINT = API_BASE_URL.concat('/persons');

// Search
export const API_STRUCTURES_SEARCH_END_POINT = API_BASE_URL.concat('/structures/search');
export const API_PERSONS_SEARCH_END_POINT = API_BASE_URL.concat('/persons/search');
export const API_PROJECTS_SEARCH_END_POINT = API_BASE_URL.concat('/projects/search');
export const API_PUBLICATIONS_SEARCH_END_POINT = API_BASE_URL.concat('/publications/search');

// GeoResults
export const API_STRUCTURES_GEORESULTS_END_POINT = API_BASE_URL.concat('/structures/search/georesults');
export const API_PERSONS_GEORESULTS_END_POINT = API_BASE_URL.concat('/persons/search/georesults');
export const API_PROJECTS_GEORESULTS_END_POINT = API_BASE_URL.concat('/projects/search/georesults');
export const API_PUBLICATIONS_GEORESULTS_END_POINT = API_BASE_URL.concat('/publications/search/georesults');

// Like
export const API_STRUCTURE_LIKE_END_POINT = API_BASE_URL.concat('/structures/like');
export const API_PUBLICATIONS_LIKE_END_POINT = API_BASE_URL.concat('/publications/like');
export const API_PROJECT_LIKE_END_POINT = API_BASE_URL.concat('/projects/like');
export const API_PERSON_LIKE_END_POINT = API_BASE_URL.concat('/persons/like');

// portrait
export const OTHER_WEBSITES = ['wikipedia', 'HAL', 'Hypothese'];

// ecosystem
export const GRAPH_ITEMS_LIST = ['Structure de recherche', 'Secteur privé', 'Secteur public', 'Organisation internationale'];
export const ECOSYSTEM_LIMIT = 100;

// Patents
export const EP = ['AL', 'AT', 'BA', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'GL', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'ME', 'MK', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'RS', 'SE', 'SI', 'SK', 'SM', 'TR'];
export const EA = ['AM', 'AZ', 'BY', 'KG', 'KZ', 'RU', 'TJ', 'TM'];
export const AP = ['BW', 'GH', 'GM', 'KE', 'LR', 'LS', 'MW', 'MZ', 'NA', 'RW', 'SD', 'SL', 'ST', 'TZ', 'UG', 'ZM', 'ZW', 'SZ'];
export const WO = ['AE', 'AG', 'AL', 'AM', 'AO', 'AT', 'AU', 'AZ', 'BA', 'BB', 'BE', 'BF', 'BG', 'BH', 'BJ', 'BN', 'BR', 'BW', 'BY', 'BZ', 'CA', 'CF', 'CG', 'CH', 'CI', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'GL', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'FI', 'FR', 'GA', 'GB', 'GD', 'GE', 'GH', 'GM', 'GN', 'GQ', 'GR', 'GT', 'GW', 'HN', 'HR', 'HU', 'ID', 'IE', 'IL', 'IN', 'IR', 'IS', 'IT', 'JO', 'JP', 'KE', 'KG', 'KH', 'KM', 'KN', 'KP', 'KR', 'KW', 'KZ', 'LA', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MG', 'MK', 'ML', 'MN', 'MR', 'MT', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NE', 'NG', 'NI', 'NL', 'NO', 'NZ', 'OM', 'PA', 'PE', 'PG', 'PH', 'PL', 'PT', 'QA', 'RO', 'RS', 'RU', 'RW', 'SA', 'SC', 'SD', 'SE', 'SG', 'SI', 'SK', 'SL', 'SM', 'SN', 'ST', 'SV', 'SY', 'SZ', 'TD', 'TG', 'TH', 'TJ', 'TM', 'TN', 'TR', 'TT', 'TZ', 'UA', 'UG', 'US', 'UZ', 'VC', 'VN', 'WS', 'ZA', 'ZM', 'ZW'];

// FAQ
export const GROUPKEY_ORDERED = ['general', 'search', 'entities', 'persons', 'prizes', 'projects', 'productions', 'publications', 'patents'];
