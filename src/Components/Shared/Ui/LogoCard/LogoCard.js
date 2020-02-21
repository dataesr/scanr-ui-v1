import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../../GlobalContext';

/* SCSS */
import classes from './LogoCard.scss';

import initialImage from '../../images/Spinner-1s-70px.gif';

/**
 * LogoCard
 * Url : ui
 * Description : Composant affichant un logo soit à partir d'une URL distante, soit à partir du répertoire ./img
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const LogoCard = (props) => {
  const [count, setCount] = useState(0);

  const newTestFunction = () => {
    if (count < 3) {
      setCount(count + 1);
    }
  };

  const context = useContext(GlobalContext);
  let img = <img src={initialImage} onLoad={newTestFunction} alt="Chargement..." />;
  let helper = null;
  const src = (props.src) ? props.src : `./img/logo-${props.label}.svg`;
  if (count === 1) {
    img = <img src={src} alt="url1" onError={newTestFunction} className={`img-fluid ${classes.img}`} />;
    helper = <span className={classes.helper} />;
  }
  if (count === 2) {
    if (props.targetUrl) {
      img = (
        <a href={props.targetUrl} target="_blank" rel="noopener noreferrer">
          <img src={props.url} alt="url2" onError={newTestFunction} className={`img-fluid ${classes.img}`} />
        </a>
      );
    } else {
      img = <img src={props.url} alt="url2" onError={newTestFunction} className={`img-fluid ${classes.img}`} />;
    }
    helper = <span className={classes.helper} />;
  }
  if (count === 3) {
    img = (
      <div>
        <div className={classes.Logo}><i className="fas fa-image" aria-hidden="true" /></div>
        <h3 className={classes.Title}>
          {
            (context.language === 'fr' ? 'Logo non connu' : 'Unknown logo')
          }
        </h3>
      </div>
    );
  }

  return (
    <div className={`${classes.card} ${props.cssClass}`}>
      {helper}
      {img}
    </div>
  );
};

export default LogoCard;

LogoCard.propTypes = {
  src: PropTypes.string,
  label: PropTypes.string,
  url: PropTypes.string,
  targetUrl: PropTypes.string,
  cssClass: PropTypes.string,
};
