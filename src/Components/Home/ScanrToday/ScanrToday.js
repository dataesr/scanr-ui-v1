import React from 'react';
import { FormattedHTMLMessage, FormattedNumber } from 'react-intl';
import useSearchAPI from '../../../Hooks/useSearchAPI';
import {
  API_STRUCTURES_SEARCH_END_POINT,
  API_PERSONS_SEARCH_END_POINT,
  API_PROJECTS_SEARCH_END_POINT,
  API_PUBLICATIONS_SEARCH_END_POINT,
} from '../../../config/config';

import {
  DatabaseText,
  Chevron,
  ChevronContainer,
  ChevronStart,
  ChevronEnd,
} from './styles';


const ScanrToday = () => {
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
  const request = { query: '' };
  const entities = useSearchAPI(API_STRUCTURES_SEARCH_END_POINT, entityRequest);
  const persons = useSearchAPI(API_PERSONS_SEARCH_END_POINT, request);
  const projects = useSearchAPI(API_PROJECTS_SEARCH_END_POINT, request);
  const productions = useSearchAPI(API_PUBLICATIONS_SEARCH_END_POINT, request);

  return (
    <section>
      <ChevronContainer>
        <ChevronStart>
          <div className="text-center">
            <img
              src="./img/scanr/logo-scanr-white_alt.svg"
              alt="Logo Entity scanR"
              aria-hidden
              style={{ maxHeight: '70px' }}
            />
            <DatabaseText>
              <FormattedHTMLMessage id="Home.ScanrToday.scanrData" />
            </DatabaseText>
          </div>
        </ChevronStart>
        <Chevron as="a" href="/recherche/structures">
          <div className="text-center">
            <img
              src="./img/icons/icon-entities.svg"
              alt=""
              aria-hidden
              style={{ maxHeight: '70px' }}
            />
            <DatabaseText>
              <FormattedNumber value={entities.data.total} />
              <FormattedHTMLMessage id="Home.ScanrToday.cardEntity" />
            </DatabaseText>
          </div>
        </Chevron>
        <Chevron as="a" href="/recherche/persons">
          <div className="text-center">
            <img
              src="./img/icons/icon-persons.svg"
              alt=""
              aria-hidden
              style={{ maxHeight: '70px' }}
            />
            <DatabaseText>
              <FormattedNumber value={persons.data.total} />
              <FormattedHTMLMessage id="Home.ScanrToday.cardAuthor" />
            </DatabaseText>
          </div>
        </Chevron>
        <Chevron as="a" href="/recherche/projects">
          <div className="text-center">
            <img
              src="./img/icons/icon-projects.svg"
              alt=""
              aria-hidden
              style={{ maxHeight: '70px' }}
            />
            <DatabaseText>
              <FormattedNumber value={projects.data.total} />
              <FormattedHTMLMessage id="Home.ScanrToday.cardProject" />
            </DatabaseText>
          </div>
        </Chevron>
        <ChevronEnd as="a" href="/recherche/publications">
          <div className="text-center">
            <img
              src="./img/icons/icon-publications.svg"
              alt=""
              aria-hidden
              style={{ maxHeight: '70px' }}
            />
            <DatabaseText>
              <FormattedNumber value={productions.data.total} />
              <FormattedHTMLMessage id="Home.ScanrToday.cardProduction" />
            </DatabaseText>
          </div>
        </ChevronEnd>
      </ChevronContainer>
    </section>
  );
};
export default ScanrToday;
