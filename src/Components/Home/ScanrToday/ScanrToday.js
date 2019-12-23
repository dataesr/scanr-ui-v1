import React from 'react';
import { FormattedHTMLMessage, FormattedNumber } from 'react-intl';
import useSearchAPI from '../../../Hooks/useSearchAPI';
import {
  API_STRUCTURES_SEARCH_END_POINT,
  API_PERSONS_SEARCH_END_POINT,
  API_PROJECTS_SEARCH_END_POINT,
  API_PUBLICATIONS_SEARCH_END_POINT,
} from '../../../config/config';

// import LexiconModal from '../../Shared/Lexicon/LexiconModal/LexiconModal';
import entityLogo from '../../../images/svg/icon-entities.svg';
import personLogo from '../../../images/svg/icon-persons.svg';
import projectLogo from '../../../images/svg/icon-projects.svg';
import productionLogo from '../../../images/svg/icon-publications.svg';
import scanRLogo from '../../Shared/svg/logo-scanr-white_V3.svg';
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
              src={scanRLogo}
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
              src={entityLogo}
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
              src={personLogo}
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
              src={projectLogo}
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
              src={productionLogo}
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
