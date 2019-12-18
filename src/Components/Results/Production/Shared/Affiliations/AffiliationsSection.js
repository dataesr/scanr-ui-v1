import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import AffiliationCard from '../../../../Search/Results/ResultCards/EntityCard';
import CounterCard from '../../../../Shared/Ui/CounterCard/CounterCard';
import CounterListCard from '../../../../Shared/Ui/CounterListCard/CounterListCard';

import classes from '../../Publication/Publication.scss';

/**
 * Affiliations Section
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const nbAffiliationsToShow = 7;
const SectionAffiliations = props => (
  <Fragment>
    <ul className={`row ${classes.Ul}`}>
      {
        (props.data.affiliations && props.data.affiliations.length > 1)
          ? (
            <div className={`col-md-4 ${classes.CardContainer}`}>
              <CounterCard
                counter={props.data.affiliations.length}
                title=""
                label={<FormattedHTMLMessage id="Publication.affiliations.title" />}
                color="Default"
                className={classes.PersonCardHeight}
              />
            </div>
          ) : null
      }
      {
        props.data.affiliations.map((item, index) => {
          if (index < nbAffiliationsToShow) {
            return (
              <li key={item} className={`col-md-4 ${classes.Li}`}>
                <AffiliationCard
                  data={item}
                  small
                  language={props.language}
                />
              </li>
            );
          }
          return null;
        })
      }
      {
        (props.data.affiliations && props.data.affiliations.length > nbAffiliationsToShow)
          ? (
            <div className={`col-md-4 ${classes.CardContainer}`}>
              <CounterListCard
                language={props.language}
                data={props.data.affiliations}
                objectType={props.data.productionType}
                limit={nbAffiliationsToShow}
                title=""
                color="Default"
                labelKey="affiliations-publication"
                modalTitleKey="affiliations.modal.title"
                isEntity
              />
            </div>
          ) : null
      }
    </ul>
  </Fragment>
);

export default SectionAffiliations;

SectionAffiliations.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
