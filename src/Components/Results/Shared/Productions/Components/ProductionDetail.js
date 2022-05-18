import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import getSelectKey from '../../../../../Utils/getSelectKey';
import ButtonToPage from '../../../../Shared/Ui/Buttons/ButtonToPage';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './ProductionDetail.scss';
import ProductionAuthors from './ProductionAuthors';
import ProductionInfos from './ProductionInfos';

/**
 * ProductionDetail
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProductionDetail = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  if (Object.entries(props.data).length === 0) {
    return null;
  }

  let id = '';
  if (props.data.id.substring(0, 3) === 'doi') {
    id = `doi : ${props.data.id.substring(3)}`;
  } else if (props.data.id.substring(0, 5) === 'these') {
    id = `these : ${props.data.id.substring(5)}`;
  } else if (props.data.id.substring(0, 5) === 'sudoc') {
    id = `sudoc : ${props.data.id.substring(5)}`;
  } else if (props.data.id.substring(0, 6) === 'brevet') {
    id = `brevet : ${props.data.id.substring(6)}`;
  }

  // Mots clés
  let keywords = [];
  if (props.data.keywords && props.data.keywords.fr) {
    keywords = props.data.keywords.fr;
  } else if (props.data.keywords && props.data.keywords.en) {
    keywords = props.data.keywords.en;
  }
  keywords = [...new Set(keywords)];

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className="d-flex flex-column h-100">
        <p className={classes.detailTitle}>
          {getSelectKey(props.data, 'title', props.language, 'default')}
        </p>
        <ProductionAuthors production={props.data} language={props.language} />
        <ProductionInfos source={props.data.source} id={id} publicationDate={props.data.publicationDate} />
        {
          (getSelectKey(props.data, 'summary', props.language, 'default') || keywords.length > 0)
            ? <hr className={`w-100 ${classes[props.data.productionType]}`} />
            : null
        }
        {
          (getSelectKey(props.data, 'summary', props.language, 'default'))
            ? (
              <div className={classes.Summary}>
                {getSelectKey(props.data, 'summary', props.language, 'default')}
              </div>
            )
            : null
        }
        <div className={classes.Keywords}>
          {
            keywords.map(keyword => (
              <Fragment key={keyword}>
                <a href={`/recherche/all?query=${keyword}`}>
                  {`#${keyword}`}
                </a>
                &nbsp;
              </Fragment>
            ))
          }
        </div>
        <hr className={`w-100 mt-auto ${classes[props.data.productionType]}`} />
        <div className="d-flex justify-content-between flex-wrap">
          <div className={`my-1 ${classes.Oa}`}>
            {(props.data.isOa) ? (
              <div className="d-flex align-items-center">
                <span aria-hidden className={`fa-stack ${classes.isOa}`}>
                  <i className="fas fa-circle fa-stack-2x" />
                  <i className="fas fa-lock-open fa-stack-1x fa-inverse" />
                </span>
                <ButtonToPage
                  className={`${classes.btn_scanrBlue} ${classes.RectangleButton}`}
                  url={props.data.oaEvidence?.url}
                  target="_blank"
                >
                  {(props.language === 'fr') ? 'Accéder à la publication' : 'Access the publication'}
                </ButtonToPage>
              </div>
            ) : (
              <span className={`fa-stack ${classes.isNotOa}`}>
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fas fa-lock fa-stack-1x fa-inverse" />
              </span>
            )}
          </div>
          <ButtonToPage
            className={`${classes.btn_scanrBlue} ${classes.RectangleButton}`}
            url={`publication/${props.data.id.replace(new RegExp('/', 'g'), '%25252f')}`}
          >
            <FormattedHTMLMessage id="voir_production" />
          </ButtonToPage>
        </div>
      </div>
    </IntlProvider>
  );
};

export default ProductionDetail;

ProductionDetail.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
