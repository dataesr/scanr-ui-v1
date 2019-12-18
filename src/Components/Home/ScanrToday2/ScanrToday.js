import React from 'react';
import styled from 'styled-components';
import { FormattedHTMLMessage, FormattedNumber } from 'react-intl';
import useSearchAPI from '../../../Hooks/useSearchAPI';
import {
  API_STRUCTURES_SEARCH_END_POINT,
  API_PERSONS_SEARCH_END_POINT,
  API_PROJECTS_SEARCH_END_POINT,
  API_PUBLICATIONS_SEARCH_END_POINT,
} from '../../../config/config';

import LexiconModal from '../../Shared/Lexicon/LexiconModal/LexiconModal';
import CounterCardByType from './CounterCards/CounterCardByType';

import entityLogo from '../../../images/svg/icon-entities.svg';
import personLogo from '../../../images/svg/icon-persons.svg';
import projectLogo from '../../../images/svg/icon-projects.svg';
import productionLogo from '../../../images/svg/icon-publications.svg';

import classes from './ScanrToday.scss';

const DatabaseText = styled.p`
  color: white;
  margin: 0;
  font-size: 0.9rem;
  padding-left: 16px;
  padding-right: 16px;
`;

const Container = styled.div`
  width: 95%;
  margin: auto;
`;


const ScanrToday = () => {
  const request = { query: '' };
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
  const entities = useSearchAPI(API_STRUCTURES_SEARCH_END_POINT, entityRequest);
  const persons = useSearchAPI(API_PERSONS_SEARCH_END_POINT, request);
  const projects = useSearchAPI(API_PROJECTS_SEARCH_END_POINT, request);
  const productions = useSearchAPI(API_PUBLICATIONS_SEARCH_END_POINT, request);

  return (
    <section className={classes.ScanrToday}>
      <Container>
        <div className={`row py-3 px-5 ${classes.database}`}>
          <div className="col-3 d-flex align-items-center">
            <img
              src={entityLogo}
              alt="Logo MESRI"
              aria-hidden
            />
            <DatabaseText>Recherchez parmis plus de 35 000 structures publiques et privés</DatabaseText>
          </div>
          <div className="col-3 d-flex align-items-center">
            <img
              src={personLogo}
              alt="Logo MESRI"
              aria-hidden
            />
            <DatabaseText>Recherchez parmis plus de 450 000 auteurs</DatabaseText>
          </div>
          <div className="col-3 d-flex align-items-center">
            <img
              src={projectLogo}
              alt="Logo MESRI"
              aria-hidden
            />
            <DatabaseText>Recherchez parmis les 80 000 projets et financements</DatabaseText>
          </div>
          <div className="col-3 d-flex align-items-center">
            <img
              src={productionLogo}
              alt="Logo MESRI"
              aria-hidden
            />
            <DatabaseText>Recherchez parmis les 2 000 000 de publications francaises</DatabaseText>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default ScanrToday;
