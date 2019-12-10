import React from 'react';
import { FormattedHTMLMessage, FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types';
import useSearchAPI from '../../../Hooks/useSearchAPI';
import {
  API_STRUCTURES_SEARCH_END_POINT,
  API_PERSONS_SEARCH_END_POINT,
  API_PROJECTS_SEARCH_END_POINT,
  API_PUBLICATIONS_SEARCH_END_POINT,
} from '../../../config/config';

import LexiconModal from '../../Shared/Lexicon/LexiconModal/LexiconModal';
import FAQModal from '../../Shared/FAQ/FAQModal/FAQModal';
import CounterCardByType from './CounterCards/CounterCardByType';
import Background from '../../../images/img/poudre-bleu_Fgris-B.jpg';

import classes from './ScanrToday.scss';

const ScanrToday = (props) => {
  const request = { query: '' };
  const entities = useSearchAPI(API_STRUCTURES_SEARCH_END_POINT, request);
  const persons = useSearchAPI(API_PERSONS_SEARCH_END_POINT, request);
  const projects = useSearchAPI(API_PROJECTS_SEARCH_END_POINT, request);
  const productions = useSearchAPI(API_PUBLICATIONS_SEARCH_END_POINT, request);

  const sectionStyle = {
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'bottom 0 left 0',
  };

  if (!props.isFull) {
    sectionStyle.paddingTop = '230px';
  }
  return (
    <section style={sectionStyle} className={classes.ScanrToday}>
      <div className="container">
        <div className="row">
          <div className="col-lg">
            <h2 className={classes.Title}>
              <FormattedHTMLMessage id="Home.ScanrToday.title" />
              &nbsp;
              <LexiconModal target="ScanrToday">
                <i className="fa fa-info-circle" />
              </LexiconModal>
              <FAQModal target="q1">
                <i className="fa fa-info-circle" />
              </FAQModal>
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

ScanrToday.propTypes = {
  isFull: PropTypes.bool,
};

// <hr style={{ marginBottom: '8px' }} />
// <div className="row">
//   <div className="col-lg">
//     <span className={classes.SubTitle}>
//       <FormattedHTMLMessage
//         id="ScanrToday.string.evolution"
//         defaultMessage="ScanrToday.string.evolution"
//       />
//     </span>
//   </div>
//   <div className="col-lg">
//     <EvolutionCardByType
//       schema="entities"
//       value="-2"
//       language={this.props.language}
//     />
//   </div>
//   <div className="col-lg">
//     <EvolutionCardByType
//       schema="persons"
//       value="+154"
//       language={this.props.language}
//     />
//   </div>
//   <div className="col-lg">
//     <EvolutionCardByType
//       schema="projects"
//       value="+45"
//       language={this.props.language}
//     />
//   </div>
//   <div className="col-lg">
//     <EvolutionCardByType
//       schema="publications"
//       value="+26"
//       language={this.props.language}
//     />
//   </div>
// </div>
// <hr style={{ marginTop: '0px' }} />
