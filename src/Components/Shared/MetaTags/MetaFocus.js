import React from 'react';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';


const MetaFocus = props => (
  <MetaTags>
    <title>{props.pageTitle}</title>
    <meta id="meta-description" name="description" content={props.pageDescription} />
    <meta id="og-title" property="og:title" content={props.pageTitle} />
    <meta id="og-image" property="og:image" content={props.pageImage} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={props.pageTitle} />
    <meta name="twitter:description" content={props.pageDescription} />
    <meta name="twitter:image" content={props.pageImage} />
    <ol itemScope itemType="http://schema.org/BreadcrumbList">
      <li
        itemProp="itemListElement"
        itemScope
        itemType="http://schema.org/ListItem"
      >
        <a itemProp="item" href={props.href1}>
          {/* eslint-disable-next-line */}
         <span itemProp="name">scanR</span></a>
        <meta itemProp="position" content="1" />
      </li>
      <li
        itemProp="itemListElement"
        itemScope
        itemType="http://schema.org/ListItem"
      >
        <a itemProp="item" href={props.href2}>
          {/* eslint-disable-next-line */}
         <span itemProp="name">Focus</span></a>
        <meta itemProp="position" content="2" />
      </li>
      <li
        itemProp="itemListElement"
        itemScope
        itemType="http://schema.org/ListItem"
      >
        <a itemProp="item" href={props.href3}>
          {/* eslint-disable-next-line */}
         <span itemProp="name">{props.title}</span></a>
        <meta itemProp="position" content="3" />
      </li>
    </ol>
  </MetaTags>
);

export default MetaFocus;

MetaFocus.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDescription: PropTypes.string.isRequired,
  pageImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href1: PropTypes.string.isRequired,
  href2: PropTypes.string.isRequired,
  href3: PropTypes.string.isRequired,
};
