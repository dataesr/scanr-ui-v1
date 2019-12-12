import React, { useState } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
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
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

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
const Patent = (props) => {
  const [depotsViewMode, setDepotsViewMode] = useState('graph');
  const name = getSelectKey(props.data, 'title', props.language, 'default');
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <React.Fragment>
        <SectionProductions id="Identity">
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="productions"
              language={props.language}
              id={props.id}
              title={<FormattedHTMLMessage id="Patent.identity" />}
            />
            <Identity language={props.language} data={props.data} id={props.id} />
          </div>
        </SectionProductions>
        <SectionWhite id="Participants">
          <div className="container">
            <SectionTitle
              icon="fa-user-friends"
              lexicon="PatentParticipant"
              objectType="publications"
              language={props.language}
              id={props.id}
              title={<FormattedHTMLMessage id="Patents.participants" />}
            />
            <Participants
              language={props.language}
              data={props.data.authors || []}
              affiliations={props.data.affiliations || []}
              id={props.id}
            />
          </div>
        </SectionWhite>
        <SectionGrey id="Depots">
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              objectType="productions"
              language={props.language}
              id={props.id}
              lexicon="PatentDepot"
              title={<FormattedHTMLMessage id="Patent.depots" />}
              viewModeClickHandler={view => setDepotsViewMode(view)}
              viewMode={depotsViewMode}
            />
            <Depots
              language={props.language}
              data={props.data.links || []}
              id={props.id}
              name={name}
              viewMode={depotsViewMode}
            />
          </div>
        </SectionGrey>
        <SectionProductions id="Similars">
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              lexicon="PublicationSimilar"
              language={props.language}
              title={<FormattedHTMLMessage id="Patents.similars" />}
            />
            <Similars language={props.language} id={props.id} />
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
