import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import OaCard from './OaCard';
import OaHost from './OaHost';
import OaLink from './OaLink';

import classes from '../../../../../style.scss';

/**
 * Open Access Section
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SectionOa = props => (
  <Fragment>
    <div className="row">
      <div className={`col-md-3 ${classes.CardContainer}`}>
        <OaCard
          language={props.language}
          oa={(props.data && props.data.isOa) ? props.data.isOa : false}
          oaEvidence={(props.data && props.data.oaEvidence) ? props.data.oaEvidence : false}
        />
      </div>
      {
        (props.data && props.data.oaEvidence && props.data.oaEvidence.hostType) ? (
          <div className={`col-md-3 ${classes.CardContainer}`}>
            <OaHost
              language={props.language}
              oaEvidence={props.data.oaEvidence}
            />
          </div>
        ) : null
      }
      {
        (props.data && props.data.oaEvidence && (props.data.oaEvidence.url || props.data.oaEvidence.pdfurl)) ? (
          <div className={`col-md-3 ${classes.CardContainer}`}>
            <OaLink
              language={props.language}
              oaEvidence={props.data.oaEvidence}
            />
          </div>
        ) : null
      }
    </div>
  </Fragment>
);

export default SectionOa;

SectionOa.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
