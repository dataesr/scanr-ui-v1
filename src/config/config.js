import React from 'react';

export const version = '1.0';

/* Pagination */
export const PAGE = 1;
export const PER_PAGE = 12;

/* Statuts */
export const STATUS_ACTIVE = 'active';
export const STATUS_CONFLICT = 'conflict';
export const STATUS_MAIN = 'main';
export const STATUS_OLD = 'old';
export const STATUS_ARRAY = [STATUS_ACTIVE, STATUS_CONFLICT, STATUS_MAIN, STATUS_OLD];

/* Réseaux sociaux */
export const FACEBOOK = 'facebook';
export const LINKEDIN = 'linkedin';
export const TWITTER = 'twitter';
export const VIADEO = 'viadeo';
export const YOUTUBE = 'youtube';
export const SOCIAL_MEDIAS_ARRAY = ['facebook', 'linkedin', 'twitter', 'viadeo', 'youtube'];
export const FACEBOOK_ICON = <i className="fab fa-facebook" />;
export const LINKEDIN_ICON = <i className="fab fa-linkedin" />;
export const TWITTER_ICON = <i className="fab fa-twitter" />;
export const VIADEO_ICON = <i className="fab fa-viadeo" />;
export const YOUTUBE_ICON = <i className="fab fa-youtube" />;

/* ERREURS */
export const ERREUR_STATUT = 'Erreur statut';
export const ERREUR_NULL = 'Champ vide';
export const ERREUR_PATCH = "Erreur lors de l'envoi du formulaire";
/* Doc */
export const URL_DOC = 'http://10.243.98.74:3000';

/* API */
// export const API_END_POINT = 'http://0.0.0.0:5000/api/v0.1/datastore/';
// export const API_END_POINT = 'http://10.243.98.107:5002/api/v0.1/datastore/';
export const API_END_POINT = 'http://10.243.98.15:5000/api/v1/';
