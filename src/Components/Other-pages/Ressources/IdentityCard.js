import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';


/* SCSS */
import classes from './IdentityCard.scss';

const IdentityCard = (props) => {
  const logo = `../img/logo-${props.labelKey}.svg`;
  return (
    <div className={`container ${classes.IdentityCard}`}>
      <div className={`row ${classes.Logo}`}>
        <img
          src={logo}
          alt={props.labelKey}
          className={`img-fluid ${classes.img}`}
        />
      </div>
      <hr />
      <a href={props.WebSource} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
          Site internet de la source
          </div>
          <span className="col text-right">
            <i className="fas fa-arrow-right" />
          </span>
        </div>
      </a>
      <hr />
      <div className={classes.ProducteurGras}>
      Producteur
      </div>
      <div className={classes.ProducteurNom}>
        <FormattedHTMLMessage
          id={`${props.labelKey}.Producteur`}
          defaultMessage="s"
        />
      </div>
      <a href={props.WebProducteur} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
            Site internet
          </div>
          <span className="col text-right">
            <i className="fas fa-arrow-right" />
          </span>
        </div>
      </a>
      <a href={props.WebWikipedia} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
            Page Wikipédia
          </div>
          <span className="col text-right">
            <i className="fas fa-arrow-right" />
          </span>
        </div>
      </a>
      <hr />
      <ButtonToPage
        className={classes.Button}
        url=""
      >
        Voir dans scanR
      </ButtonToPage>
    </div>
  );
};


export default IdentityCard;

IdentityCard.propTypes = {
  labelKey: PropTypes.string,
  webSite: PropTypes.string,
};
