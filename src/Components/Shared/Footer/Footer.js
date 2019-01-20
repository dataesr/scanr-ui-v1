import React from 'react';

import classes from './Footer.scss';


const Footer = () => (
  <section className={classes.Footer}>
    <div className="container">
      <div className="row">
        <div className="col">
          <img
            src="./img/logo-ministere.svg"
            alt="Logo MESRI"
            className={classes.Logo}
          />
        </div>
        <div className="col">
          <ul>
            <li><a href="#">Open data - API</a></li>
            <li><a href="#">Contribuer</a></li>
            <li><a href="#">Github</a></li>
          </ul>
        </div>
        <div className="col">
          <ul>
            <li><a href="#">Accessibilité</a></li>
            <li><a href="#">Aide à la navigation</a></li>
            <li><a href="#">Plan du site</a></li>
            <li><a href="#">Mentions légales</a></li>
          </ul>
        </div>
        <div className="col">
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Glossaire</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="col">
          <div><a href="#">Notre blog</a></div>
          <div>Suivez-nous sur</div>
          <ul>
            <li className={classes.SocialNetworkItem}>
              <a href="#"><i className="fab fa-twitter" /></a>
            </li>
            <li className={classes.SocialNetworkItem}>
              <a href="#"><i className="fab fa-facebook-f" /></a>
            </li>
            <li className={classes.SocialNetworkItem}>
              <a href="#"><i className="fab fa-instagram" /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Footer;
