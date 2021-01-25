import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import Similars from '../Shared/Similars/Similars';
import Participants from './Sections/Participants';
import Identity from './Sections/Identity';
import Depots from './Sections/Depots';
import SectionTitle from '../../Shared/SectionTitle';
import getSelectKey from '../../../../Utils/getSelectKey';

// Styles
import { SectionGrey, SectionWhite, SectionProductions } from '../../Shared/styles';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Patent
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Patent = ({ id, data, language }) => {
  const [depotsViewMode, setDepotsViewMode] = useState('graph');
  const name = getSelectKey(data, 'title', language, 'default');
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <React.Fragment>
        <SectionProductions id="Identity">
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="productions"
              lexicon="InventionPortrait"
              language={language}
              id={id}
              title={messages[language]['Patent.identity']}
            />
            <Identity language={language} data={data} id={id} />
          </div>
        </SectionProductions>
        <SectionWhite id="Participants">
          <div className="container">
            <SectionTitle
              icon="fa-user-friends"
              lexicon="PatentParticipant"
              objectType="publications"
              language={language}
              id={id}
              title={messages[language]['Patent.participants']}
            />
            <Participants
              language={language}
              data={data.authors || []}
              affiliations={data.affiliations || []}
              id={id}
            />
          </div>
        </SectionWhite>
        <SectionGrey id="Depots">
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              objectType="productions"
              language={language}
              id={id}
              lexicon="PatentDepot"
              title={messages[language]['Patent.depots']}
              viewModeClickHandler={view => setDepotsViewMode(view)}
              viewMode={depotsViewMode}
            />
            <Depots
              language={language}
              data={data.links || []}
              id={id}
              name={name}
              viewMode={depotsViewMode}
            />
          </div>
        </SectionGrey>
        <SectionProductions id="Similars">
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              lexicon="PatentSimilar"
              language={language}
              title={messages[language]['Patent.similars']}
            />
            <Similars language={language} id={id} />
          </div>
        </SectionProductions>
      </React.Fragment>
    </IntlProvider>
  );
};

export default Patent;

Patent.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
