import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import PrizeCard from '../../../../../../Shared/Ui/PrizeCard/PrizeCard';
import styles from '../../../../../../../style.scss';
import classes from './Prizes.scss';

/**
 * Affiliations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Prizes = (props) => {
  const newAwards = [];
  if (props.data.awards) {
    props.data.awards.forEach((element) => {
      let labelToUse = element.label;
      if (element.description) {
        labelToUse = element.label.concat(' (', element.description).concat(')');
      }
      newAwards.push({
        label: labelToUse,
        date: element.date,
      });
    });

    return (
      <section className="container-fluid">
        <div className="row">
          <div className={`col-12 ${classes.CardContainer}`}>
            <div className={classes.SubSectionTitle}>
              <FormattedHTMLMessage
                id="Person.Informations.Prizes.title"
              />
            </div>
            <div className="container-fluid">
              <div className="row">
                {
                  newAwards.map(award => (
                    <div key={award.label} className={`col-md-6 col-sm-12 ${classes.CardContainer}`}>
                      <PrizeCard
                        date={award.date}
                        language={props.language}
                        label={award.label}
                        icon="prize"
                        color={styles.personColor}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default Prizes;

Prizes.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
