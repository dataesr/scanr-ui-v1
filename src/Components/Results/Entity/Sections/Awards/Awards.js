import React from 'react';
import PropTypes from 'prop-types';

import EmptySection from '../../../Shared/EmptySection/EmptySection';
import PrizeCard from '../../../../Shared/Ui/PrizeCard/PrizeCard';

import getSelectKey from '../../../../../Utils/getSelectKey';

import classes from './Awards.scss';
import styles from '../../../../../style.scss';

/**
 * Awards
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Awards = (props) => {
  if (!props.data || !props.data.badges) return <EmptySection />;
  const networkBadges = ['carnot', 'gican', 'gifas', 'gicat', 'rescurie', 'allenvi', 'itagricole', 'irt', 'polecompetitivite', 'satt'];
  const nonNetworkBadges = props.data.badges.filter(b => !(networkBadges.includes(b.code.toLowerCase())));
  if (!nonNetworkBadges.length) return <EmptySection color="white" />;
  return (
    <div className="row">
      {
        nonNetworkBadges.map(badge => (
          <div className={`col-md-4 ${classes.CardContainer}`}>
            <PrizeCard
              date={null}
              language={props.language}
              label={getSelectKey(badge, 'label', props.language, 'fr')}
              icon="prize"
              color={styles.personColor}
            />
          </div>
        ))
      }
    </div>
  );
};

export default Awards;

Awards.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
