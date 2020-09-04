import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../../GlobalContext';
import LogoCard from '../LogoCardWithButton/LogoCardWithButton';

import classes from './GscholarCard.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};


/**
 * GscholarCard component
 * Url : .
 * Description : Carte avec info wiki
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const GscholarCard = (props) => {
  const context = useContext(GlobalContext);
  const url = 'https://scholar.google.com/citations?user='.concat(props.id);

  return (
    <div className={classes.GscholarCard}>
      <div className={classes.Content}>
        {
          (url)
            ? (
              <LogoCard
                url="/img/logo-gscholar.png"
                targetUrl={url}
                label="Google scholar"
                link={messages[context.language].gscholar_link}
                cssClass="Height250"
              />
            ) : null
        }
      </div>
    </div>
  );
};

export default GscholarCard;

GscholarCard.propTypes = {
  id: PropTypes.string,
};
