import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../../GlobalContext';
import LogoCard from '../LogoCardWithButton/LogoCardWithButton';

import classes from './TheConversationCard.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};


/**
 * TheConversationCard component
 * Url : .
 * Description : Carte avec info wiki
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const TheConversationCard = (props) => {
  const context = useContext(GlobalContext);
  const url = 'https://theconversation.com/profiles/'.concat(props.id, '/articles');

  return (
    <div className={classes.TheConversationCard}>
      <div className={classes.Content}>
        {
          (url)
            ? (
              <LogoCard
                url="/img/logo-the-conversation.svg"
                targetUrl={url}
                label="The Conversation"
                link={messages[context.language].the_conversation_link}
                cssClass="Height250"
              />
            ) : null
        }
      </div>
    </div>
  );
};

export default TheConversationCard;

TheConversationCard.propTypes = {
  id: PropTypes.string,
};
