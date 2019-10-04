import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import getSelectKey from '../../../../../Utils/getSelectKey';

import SubmitBox from '../../../../Shared/SubmitBox/SubmitBox';

import classes from './SourceCard.scss';

/**
 * SourceCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SourceCard = (props) => {
  const publisher = (props.data.publisher) ? (
    <Fragment>
      <div className={classes.Title}>
        Publisher
      </div>
      <div className={`${classes.Value} ${classes.Publisher}`}>
        {props.data.publisher}
      </div>
    </Fragment>
  ) : null;

  const title = (props.data.title) ? (
    <Fragment>
      <div className={classes.Title}>
        Title
      </div>
      <div className={`flex-grow-1 ${classes.Value}`}>
        {props.data.title}
      </div>
    </Fragment>
  ) : null;

  let issns = null;
  if (props.data.journalIssns) {
    issns = (
      <div>
        <div className={classes.Title}>
          ISSN du journal
        </div>
        <div className={classes.Value}>
          {
            props.data.journalIssns.map(issn => <div>{issn}</div>)
          }
        </div>
      </div>
    );
  }

  const pagination = (props.data.pagination) ? (
    <div>
      <div className={classes.Title}>
        Pagination
      </div>
      <div className={classes.Value}>
        {props.data.pagination}
      </div>
    </div>
  ) : null;

  if (!publisher && !title && !issns && !pagination) {
    return null;
  }


  return (
    <div className={`d-flex align-items-center flex-column ${classes.SourceCard}`}>
      {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={getSelectKey(props.allData, 'label', props.language, 'fr')} /> : null}
      {publisher}
      {title}
      <div className="d-flex pr-4 pl-4 w-100 justify-content-between">
        {issns}
        {(issns && pagination) ? <div className={classes.Border} /> : null}
        {pagination}
      </div>
    </div>
  );
};

export default SourceCard;

SourceCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
