import React from 'react';
import { FormattedHTMLMessage, FormattedNumber } from 'react-intl';
// import useSearchAPI from '../../../Hooks/useSearchAPI';
// import {
//   API_STRUCTURES_SEARCH_END_POINT,
//   API_PERSONS_SEARCH_END_POINT,
//   API_PROJECTS_SEARCH_END_POINT,
//   API_PUBLICATIONS_SEARCH_END_POINT,
// } from '../../../config/config';

// import LexiconModal from '../../Shared/Lexicon/LexiconModal/LexiconModal';
import entityLogo from '../../../images/svg/icon-entities.svg';
import personLogo from '../../../images/svg/icon-persons.svg';
import projectLogo from '../../../images/svg/icon-projects.svg';
import productionLogo from '../../../images/svg/icon-publications.svg';
import scanRLogo from '../../Shared/svg/logo-scanr-white.svg';

import { DatabaseText } from './styles';
import classes from './ScanrToday.scss';


const ScanrToday = () => {
  // const request = { query: '' };
  const entityRequest = { query: '', filters: {} };
  entityRequest.filters.status = {
    type: 'MultiValueSearchFilter',
    op: 'all',
    values: ['active'],
  };
  entityRequest.filters.isFrench = {
    type: 'MultiValueSearchFilter',
    op: 'all',
    values: [true],
  };
  // const entities = useSearchAPI(API_STRUCTURES_SEARCH_END_POINT, entityRequest);
  // const persons = useSearchAPI(API_PERSONS_SEARCH_END_POINT, request);
  // const projects = useSearchAPI(API_PROJECTS_SEARCH_END_POINT, request);
  // const productions = useSearchAPI(API_PUBLICATIONS_SEARCH_END_POINT, request);

  // Use entities.data, persons.data etc. for search counts.

  return (
    <section className={classes.ScanrToday}>
      <div className={`d-flex flex-wrap justify-content-between ${classes.database}`}>
        <div className={`p-2 ${classes.chevronStart}`}>
          <span>
            <img
              src={scanRLogo}
              alt="Logo Entity scanR"
              aria-hidden
            />
            <DatabaseText><FormattedHTMLMessage id="Home.ScanrToday.scanrData" /></DatabaseText>
          </span>
        </div>
        <div className={`col-auto  ${classes.chevron}`}>
          <span>
            <a href="/recherche/structures">
              <img
                src={entityLogo}
                alt="Logo Entity scanR"
                aria-hidden
              />
              <DatabaseText><FormattedHTMLMessage id="Home.ScanrToday.cardEntity" /></DatabaseText>
            </a>
          </span>
        </div>
        <div className={`col-auto ${classes.chevron}`}>
          <span>
            <a href="/recherche/persons">
              <img
                src={personLogo}
                alt="Logo person scanR"
                aria-hidden
              />
              <DatabaseText><FormattedHTMLMessage id="Home.ScanrToday.cardAuthor" /></DatabaseText>
            </a>
          </span>
        </div>
        <div className={`col-auto ${classes.chevron}`}>
          <span>
            <a href="/recherche/projects">
              <img
                src={projectLogo}
                alt="Logo projets scanR"
                aria-hidden
              />
              <DatabaseText><FormattedHTMLMessage id="Home.ScanrToday.cardProject" /></DatabaseText>
            </a>
          </span>
        </div>
        <div className={`col-auto ${classes.chevronEnd}`}>
          <span>
            <a href="/recherche/publications">
              <img
                src={productionLogo}
                alt="Logo productions scanR"
                aria-hidden
              />
              <DatabaseText><FormattedHTMLMessage id="Home.ScanrToday.cardProduction" /></DatabaseText>
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};
export default ScanrToday;
