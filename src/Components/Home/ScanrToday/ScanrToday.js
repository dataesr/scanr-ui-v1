import React from 'react';
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

import classes from './ScanrToday.scss';

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
      <div className="container">
        <div className="row">
          <div className="col-lg">
            <h2 className={classes.Title}>
              <FormattedHTMLMessage id="Home.ScanrToday.title" />
              &nbsp;
              <LexiconModal target="ScanrToday">
                <i className="fa fa-info-circle" />
              </LexiconModal>
            </h2>
          </div>
          <div className={`col-lg ${classes.CardContainer}`}>
            <a href="recherche/structures">
              <CounterCardByType
                logo="entities"
                title={<FormattedHTMLMessage id="Home.ScanrToday.entities" />}
                count={<FormattedNumber value={entities.data.total} />}
              />
            </a>
          </div>
          <div className={`col-lg ${classes.CardContainer}`}>
            <a href="recherche/persons">
              <CounterCardByType
                logo="persons"
                title={<FormattedHTMLMessage id="Home.ScanrToday.persons" />}
                count={<FormattedNumber value={persons.data.total} />}
              />
            </a>
          </div>
          <div className={`col-lg ${classes.CardContainer}`}>
            <a href="recherche/projects">
              <CounterCardByType
                logo="projects"
                title={<FormattedHTMLMessage id="Home.ScanrToday.projects" />}
                count={<FormattedNumber value={projects.data.total} />}
              />
            </a>
          </div>
          <div className={`col-lg ${classes.CardContainer}`}>
            <a href="recherche/publications">
              <CounterCardByType
                logo="publications"
                title={<FormattedHTMLMessage id="Home.ScanrToday.productions" />}
                count={<FormattedNumber value={productions.data.total} />}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ScanrToday;
