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
  const websourcepart = (metadata[`${props.labelKey}.WebSource`]) ? (
    <fragment>
      <a href={metadata[`${props.labelKey}.WebSource`]} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
            <FormattedHTMLMessage
              id="Identity.Source.Website.Title"
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
  const webprodpart = (metadata[`${props.labelKey}.WebProducteur`]) ? (
    <fragment>
      <a href={metadata[`${props.labelKey}.WebProducteur`]} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
            <FormattedHTMLMessage
              id="Identity.Producer.Website.Title"
              defaultMessage="contentTexte"
            />
          </div>
          <span className="col text-right">
            <i className="fas fa-arrow-right" />
          </span>
        </div>
      </a>
    </fragment>
  ) : null;
  const webprodwikipediapart = (metadata[`${props.labelKey}.WebWikipedia`]) ? (
    <fragment>
      <a href={metadata[`${props.labelKey}.WebWikipedia`]} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.LienSiteExterne}`}>
          <div className={classes.SiteExterne}>
            <FormattedHTMLMessage
              id="Identity.Producer.Wikipedia.Title"
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
        <FormattedHTMLMessage
          id="Identity.Producer"
          defaultMessage="s"
        />
      </div>
      <div className={classes.ProducteurNom}>
        <FormattedHTMLMessage
          id={`Ressource.Producteur.Nom.${props.labelKey}`}
          defaultMessage="s"
        />
      </div>
      {webprodpart}
      {webprodwikipediapart}
      <div className={classes.PositionButton}>
        <ButtonToPage
          className={classes.Button}
          url=""
        >
          <FormattedHTMLMessage
            id="Identity.Button.Tiltle"
            defaultMessage="contentTexte"
          />
        </ButtonToPage>
      </div>
    </div>
  );
};


export default IdentityCard;

IdentityCard.propTypes = {
  labelKey: PropTypes.string,
};
