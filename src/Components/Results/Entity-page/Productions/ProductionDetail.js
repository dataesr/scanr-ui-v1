import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import getSelectKey from '../../../../Utils/getSelectKey';

import ButtonToPage from '../../../Shared/Ui/Buttons/ButtonToPage';

import classes from './ProductionDetail.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

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
    return (
      <div className={classes.Empty}>
        {messages[props.language]['Entity.productions.empty.label']}
      </div>
    );
  }

  let date = '';
  if (props.data.productionType && props.data.productionType === 'publication' && props.data.publicationDate) {
    date = moment(props.data.publicationDate).format('YYYY');
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

  // Auteurs
  const maxAuthors = 3;
  const authors = [];
  for (let i = 0; i < maxAuthors; i += 1) {
    authors.push(props.data.authors[i].fullName);
  }
  const diff = props.data.authors.length - maxAuthors;
  let others = '';
  if (diff === 1) {
    others = `${messages[props.language]['Entity.productions.detail.and']} 1 ${messages[props.language]['Entity.productions.detail.author']}`;
  } else if (diff > 1) {
    others = `${messages[props.language]['Entity.productions.detail.and']} ${diff} ${messages[props.language]['Entity.productions.detail.authors']}`;
  }
  const authorsJSX = `${authors.join(', ')} ${others}`;

  return (
    <Fragment>
      <div className={classes.detailTitle}>
        {getSelectKey(props.data, 'title', props.language, 'default')}
      </div>
      <div className="d-flex justify-content-between">
        <div className={classes.Date}>
          {date}
        </div>
        <div className={classes.Ids}>
          {id}
        </div>
      </div>
      <hr />
      <div className={classes.Summary}>
        {getSelectKey(props.data, 'summary', props.language, 'default')}
      </div>
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
      <hr />
      <div className={classes.Authors}>
        {authorsJSX}
      </div>
      <div className={classes.Oa}>
        {(props.data.isOa) ? (
          <span className={`fa-stack ${classes.isOa}`}>
            <i className="fas fa-circle fa-stack-2x" />
            <i className="fas fa-lock-open fa-stack-1x fa-inverse" />
          </span>
        ) : (
          <span className={`fa-stack ${classes.isNotOa}`}>
            <i className="fas fa-circle fa-stack-2x" />
            <i className="fas fa-lock fa-stack-1x fa-inverse" />
          </span>
        )}
      </div>
      <div className={classes.Source}>
        {(props.data.source && props.data.source.publisher) ? <span>{props.data.source.publisher}</span> : null}
        {(props.data.source && props.data.source.publisher && props.data.source.title) ? messages[props.language]['Entity.productions.detail.in'] : null}
        {(props.data.source && props.data.source.title) ? <span>{props.data.source.title}</span> : null}
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <ButtonToPage
          className={`${classes.btn_dark} ${classes.BtnWidth}`}
          url={props.data.oaEvidence.pdfUrl}
        >
          <span className={classes.IconPdf}>
            <i className="fas fa-file-pdf" />
          </span>
          Voir la publication PDF
        </ButtonToPage>
        <ButtonToPage
          className={`${classes.btn_dark} ${classes.BtnWidth}`}
          url={props.data.oaEvidence.pdfUrl}
        >
          Voir la publication dans scanR
        </ButtonToPage>
      </div>
    </Fragment>
  );
};

export default ProductionDetail;

ProductionDetail.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
