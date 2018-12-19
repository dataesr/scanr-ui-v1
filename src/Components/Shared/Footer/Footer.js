import React from 'react';

import classes from './Footer.scss';

const Footer = () => (
  <section className={classes.Footer}>
    <div className="container">
      <div className="row">
        <div className="col">
          logo
        </div>
        <div className="col">
          <ul>
            <li>Open data - API</li>
            <li>Contribuer</li>
            <li>Github</li>
          </ul>
        </div>
        <div className="col">
          <ul>
            <li>Accessibilité</li>
            <li>Aide à la navigation</li>
            <li>Plan du site</li>
            <li>Mentions légales</li>
          </ul>
        </div>
        <div className="col">
          <ul>
            <li>FAQ</li>
            <li>Glossaire</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="col">
          <div>Notre blog</div>
          <div>Suivez-nous sur</div>
          <ul>
            <li>twitter</li>
            <li>facebook</li>
            <li>insta</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Footer;
