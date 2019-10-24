import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SimpleCard from '../../../../../Shared/Ui/SimpleCard/SimpleCard2';
import LogoCard from '../../../../../Shared/Ui/LogoCard/LogoCard';
import getSelectKey from '../../../../../../Utils/getSelectKey';

import classes from './SubSectionsStyles.scss';

import messagesFr from '../../../translations/fr.json';
import messagesEn from '../../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * Informations
 * Url : .
 * Informations : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const Identity = (props) => {
  const filterKeys = ['label', 'id', 'acronym', 'type'];
  let filtered = null;
  if (Object.keys(props.data).length > 0) {
    filtered = Object.keys(props.data)
      .filter(key => filterKeys.includes(key))
      .reduce((obj, key) => ({
        ...obj,
        [key]: props.data[key],
      }));
  }
  if (filtered) {
    const title = getSelectKey(filtered, 'label', props.language, 'default');
    const acro = (getSelectKey(filtered, 'acronym', props.language, 'default'))
      ? ` (${getSelectKey(filtered, 'acronym', props.language, 'default')})`
      : '';
    const titleAcro = title + acro;
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className={`p-0 ${classes.W50}`}>
          <div className={classes.SubSectionTitle}>
            <FormattedHTMLMessage
              id="Project.informations.identity.title"
              defaultMessage="Project.informations.identity.title"
            >
              {
                txt => (
                  <h3 className={classes.Title}>
                    {txt}
                  </h3>
                )
              }
            </FormattedHTMLMessage>
          </div>
          <div className="d-flex flex-wrap">
            <div className={classes.W50}>
              <LogoCard
                language={props.language}
                url={`/img/projects/${props.data.type.toLowerCase()}.png`}
                label={props.data.type.toLowerCase()}
                cssClass="Height150"
                allData={props.data}
              />
            </div>
            <div className={classes.W50}>
              <SimpleCard
                language={props.language}
                logo="fas fa-qrcode"
                title={messages[props.language]['Project.informations.identifier']}
                label={props.data.id}
                tooltip=""
                masterKey="Project/identifier"
                modifyMode={props.modifyMode}
                allData={props.data}
              />
            </div>
            <div className="w-100 p-1">
              <SimpleCard
                language={props.language}
                logo="fas fa-calendar-day"
                title={messages[props.language]['Project.informations.name']}
                label={titleAcro}
                tooltip=""
                masterKey="Project/title"
                modifyMode={props.modifyMode}
                allData={props.data}
              />
            </div>
          </div>
        </section>
      </IntlProvider>
    );
  }
  return null;
};

export default Identity;

Identity.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  modifyMode: PropTypes.bool.isRequired,
};
