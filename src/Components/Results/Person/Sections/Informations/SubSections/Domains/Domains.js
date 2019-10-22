import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import TagCard from '../../../../../../Shared/Ui/TagCard/TagCard';
import getSelectedKey from '../../../../../../../Utils/getSelectKey';

import classes from './Domains.scss';

import messagesFr from '../../../../translations/fr.json';
import messagesEn from '../../../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Affiliations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Domains = (props) => {
  if (props.data) {
    let tags = [];
    if (props.data.domains && props.data.domains.length > 0) {
      tags = props.data.domains.map(dom => getSelectedKey(dom, 'label', props.language, 'default'))
        .filter(txt => (txt))
        .filter(txt => (txt.length > 1))
        .filter(txt => (txt.length < 20))
        .sort((a, b) => b.length - a.length);
    }
    const domains = [...new Set(tags)];
    const keywords = [...new Set(getSelectedKey(props.data, 'keywords', props.language, 'fr'))];
    const tagList = (keywords.length > 0) ? keywords : domains;
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className="container-fluid">
          <div className="row">
            <div className={`col-12 ${classes.CardContainer}`}>
              <div className={classes.SubSectionTitle}>
                <FormattedHTMLMessage id="Person.informations.domains.title" defaultMessage="Person.informations.domains.title" />
              </div>
              <TagCard
                logo="fas fa-flask"
                title="Domaines de recherche"
                tagStyle={{ backgroundColor: '#3778bb', color: 'white' }}
                tagList={tagList}
                language={props.language}
                maxElements={12}
                labelListButton="Tous les domaines"
                masterKey={props.masterKey}
                modifyMode={props.modifyMode}
                allData={props.allData}
              />
            </div>
          </div>
        </section>
      </IntlProvider>
    );
  }
  return null;
};

export default Domains;

Domains.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
