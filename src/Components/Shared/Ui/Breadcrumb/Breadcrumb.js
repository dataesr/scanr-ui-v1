import React from 'react';

/* SCSS */
import classes from './Breadcrumb.scss';

const BreadCrumb = () => (
  <nav className={classes.BreadCrumb} aria-label="breadcrumb">
    <ol className={`breadcrumb ${classes.breadcrumb}`}>
      <li className={`breadcrumb-item ${classes.item}`}>Accueil</li>
      <li className={`breadcrumb-item ${classes.item}`}>test</li>
      <li className={`breadcrumb-item active ${classes.active}`} aria-current="page">Mentions légales</li>
    </ol>
  </nav>
);

export default BreadCrumb;
