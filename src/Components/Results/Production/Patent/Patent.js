import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import Similars from '../Shared/Similars/Similars';
import Participants from './Sections/Participants';
import Identity from './Sections/Identity';
import Depots from './Sections/Depots';
import HeaderTitle from '../../../Shared/Results/HeaderTitle/HeaderTitle';

import getSelectKey from '../../../../Utils/getSelectKey';

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
const handleChange = (sectionName) => {
  document.getElementById(sectionName).scrollIntoView(true);
  window.scrollBy({ top: -120, behavior: 'smooth' });
};

const Patent = (props) => {
  if (!props.data) {
    return <div>null</div>;
  }
  const name = getSelectKey(props.data, 'title', props.language, 'default');
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <React.Fragment>
        <HeaderTitle
          language={props.language}
          label={name}
          handleChangeForScroll={handleChange}
          idPage="Thesis"
          id={props.id}
        />
        <Identity language={props.language} data={props.data} id={props.id} />
        <Participants
          language={props.language}
          data={props.data.authors || []}
          affiliations={props.data.affiliations || []}
          id={props.id}
        />
        <Depots language={props.language} data={props.data.links || []} id={props.id} name={name} />
        <Similars language={props.language} id={props.id} />
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
