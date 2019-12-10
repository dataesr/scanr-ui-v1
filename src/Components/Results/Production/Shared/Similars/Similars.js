import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Background from '../../../../Shared/images/poudre-fuschia_Fgris-B.jpg';
import useLikeApi from '../../../../../Hooks/useLikeApi';
import classes from './Similars.scss';
import SectionTitle from '../../../Shared/SectionTitle';
import ProductionCard from '../../../../Search/Results/ResultCards/PublicationCard';
import SectionLoader from '../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../Shared/Errors/Errors';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Similars
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Similars = (props) => {
  const id = props.id.replace(new RegExp('%252f', 'g'), '/');
  const request = {
    fields: ['title', 'summary', 'keywords'],
    likeIds: [id],
    likeTexts: [],
    lang: 'default',
    pageSize: 10,
  };
  const { data, isLoading, isError } = useLikeApi('publications', request);
  const sectionStyle = {
    backgroundImage: `url(${Background})`,
  };
  if (isLoading) {
    return (<SectionLoader />);
  }
  if (isError) {
    return (<Errors />);
  }
  if (data.length > 0) {
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className="container-fluid py-3" style={sectionStyle} id="SimilarProductions">
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              language={props.language}
              title={messages[props.language]['Similar.productions.title']}
            />
            <div className="row">
              {
                data.slice(0, 6).map(item => (
                  <div key={item} className={`col-md-4 ${classes.CardContainer}`}>
                    <ProductionCard
                      data={item.value}
                      small
                      language={props.language}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </IntlProvider>
    );
  }
  return null;
};
export default Similars;

Similars.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
