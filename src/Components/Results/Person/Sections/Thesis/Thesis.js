import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../../../config/config';
import useSearchAPI from '../../../../../Hooks/useSearchAPI';

import SectionLoader from '../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../Shared/Errors/Errors';
import EmptySection from '../../../Shared/EmptySection/EmptySection';

import PublicationCard from '../../../../Search/Results/ResultCards/PublicationCard';
import ThesisParticipationsCard from '../../Components/ThesisParticipationsCard';
import IsOa from '../../../Production/Shared/Oa/OaCard';
import OaLink from '../../../Production/Shared/Oa/OaLink';

import classes from './Thesis.scss';
/**
 * SimilarEntities
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

// Parse thesis data for printing
const parseThesisData = (d, id) => {
  let theses = [];
  const rapporteur = [];
  const direction = [];
  if (d.length > 0) {
    d.forEach((thes, i) => {
      thes.value.authors.forEach((author) => {
        if (author.role === 'author' && author.person && author.person.id === id) {
          theses.push(d[i].value);
        } else if (author.role === 'directeurthese' && author.person && author.person.id === id) {
          direction.push(d[i].value);
        } else if (author.role === 'rapporteur' && author.person && author.person.id === id) {
          rapporteur.push(d[i].value);
        }
      });
    });
  }
  if (theses.length > 0) {
    const thesesOnly = theses.filter(t => (t.id).indexOf('these') !== -1);
    if (thesesOnly.length !== 0) {
      theses = thesesOnly;
    }
  }
  return { rapporteur, theses, direction };
};

const Thesis = (props) => {
  const request = {
    pageSize: 500,
    sourceFields: ['title', 'authors', 'oaEvidence',
      'id', 'publicationDate', 'isOa', 'productionType'],
    filters: {
      productionType: {
        type: 'MultiValueSearchFilter',
        op: 'all',
        values: ['thesis'],
      },
      'authors.person.id': {
        type: 'MultiValueSearchFilter',
        op: 'all',
        values: [props.id],
      },
    },
  };
  const { data, isLoading, isError } = useSearchAPI(API_PUBLICATIONS_SEARCH_END_POINT, request);
  if (isLoading) return <SectionLoader />;
  if (isError) return <Errors />;
  if (!data) return <EmptySection />;
  const { rapporteur, theses, direction } = parseThesisData(data.results, props.id);
  return (
    <React.Fragment>
      {
        (theses.length)
          ? (
            theses.map(thesis => (
              <div className="row" key={thesis.id}>
                <div className={`col-md-6 ${classes.CardContainer}`}>
                  <div className={classes.isOa}>
                    <PublicationCard small language={props.language} data={thesis} />
                  </div>
                </div>
                <div className={`col-md-3 ${classes.CardContainer}`}>
                  <div className={classes.isOa}>
                    <IsOa className="p-3" language={props.language} oa={thesis.isOa} />
                  </div>
                </div>
                {
                  (thesis.isOa)
                    ? (
                      <div className={`col-md-3 ${classes.CardContainer}`}>
                        <OaLink className={classes.CardHeight} language={props.language} oaEvidence={thesis.oaEvidence} />
                      </div>
                    )
                    : null
                }
              </div>
            ))
          )
          : null
      }
      <div className="row">
        {
          (direction.length)
            ? (
              <div className="p-1 col-md-6">
                <ThesisParticipationsCard
                  title={<FormattedHTMLMessage id="Person.Thesis.directed" />}
                  buttonLabel={<FormattedHTMLMessage id="Person.Global.seeAll" />}
                  dataHtml={direction.map(these => (<PublicationCard key={these.id} small language={props.language} data={these} />))}
                />
              </div>
            )
            : null
        }
        {
          (rapporteur.length)
            ? (
              <div className="p-1 col-md-6">
                <ThesisParticipationsCard
                  title={<FormattedHTMLMessage id="Person.Thesis.rapporteur" />}
                  buttonLabel={<FormattedHTMLMessage id="Person.Global.seeAll" />}
                  dataHtml={rapporteur.map(these => (<PublicationCard key={these.id} small language={props.language} data={these} />))}
                />
              </div>
            )
            : null
        }
      </div>
    </React.Fragment>
  );
};

export default Thesis;

Thesis.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
