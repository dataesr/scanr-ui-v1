import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';


/* SCSS */
import classes from './IdentityCard.scss';

/* Import des métadonnées */
import metadata from './metadata.json';

const IdentityCard = (props) => {
  const logo = `../img/logo-${props.labelKey}.svg`;
  const logopart = (logo) ? (
    <fragment>
      <div className={`row ${classes.Logo}`}>
        <img
          src={logo}
          alt={props.labelKey}
          className={`img-fluid ${classes.img}`}
        />
      </div>
      <hr />
    </fragment>
  ) : null;
  const websourcepart = (message[`Identity.Source.Website.Title`]) ? (
    <fragment>
      <a href={metadata[`${props.labelKey}.WebSource`]} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
            <FormattedHTMLMessage
              id={`Ressource.Utilisation2.${ressource}`}
              defaultMessage="contentTexte"
            />
          </div>
          <span className="col text-right">
            <i className="fas fa-arrow-right" />
          </span>
        </div>
      </a>
      <hr />
    </fragment>
  ) : null;
  return (
    <div className={`container ${classes.IdentityCard}`}>
      {logopart}
      {websourcepart}

      <div className={classes.ProducteurGras}>
      Producteur
      </div>
      <div className={classes.ProducteurNom}>
        <FormattedHTMLMessage
          id={`${props.labelKey}.Producteur`}
          defaultMessage="s"
        />
      </div>
      <a href={metadata[`${props.labelKey}.WebProducteur`]} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
            Site internet
          </div>
          <span className="col text-right">
            <i className="fas fa-arrow-right" />
          </span>
        </div>
      </a>
      <a href={metadata[`${props.labelKey}.WebWikipedia`]} target="_blank" rel="noopener noreferrer">
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
      <div className={classes.PositionButton}>
        <ButtonToPage
          className={classes.Button}
          url=""
        >
          Voir dans scanR
        </ButtonToPage>
      </div>
    </div>
  );
};


export default IdentityCard;

IdentityCard.propTypes = {
  labelKey: PropTypes.string,
};
