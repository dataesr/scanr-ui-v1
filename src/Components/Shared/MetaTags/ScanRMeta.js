import React from 'react';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';


const ScanRMeta = (props) => {
  const title = `scanR | ${props.title}`;
  const description = "scanR est un outil d'aide à l'exploration, au suivi et à la caractérisation des activités de recherche et d'innovation des acteurs français (publics et privés) de la recherche";
  const image = '../../svg/logo-scanr-blue.svg';
  return (
    <MetaTags>
      <title>{title}</title>
      <meta id="meta-description" name="description" content={description} />
      <meta id="og-title" property="og:title" content={title} />
      <meta id="og-image" property="og:image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {
        (props.href2 && props.href2Title)
          ? (
            <ol itemScope itemType="http://schema.org/BreadcrumbList">
              <li
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
              >
                <a itemProp="item" href="/">
                  <span itemProp="name">scanR</span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="http://schema.org/ListItem"
              >
                <a itemProp="item" href={props.href2}>
                  <span itemProp="name">{props.href2Title}</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
              {
                (props.href3)
                  ? (
                    <li
                      itemProp="itemListElement"
                      itemScope
                      itemType="http://schema.org/ListItem"
                    >
                      <a itemProp="item" href={props.href3}>
                        <span itemProp="name">{title}</span>
                      </a>
                      <meta itemProp="position" content="3" />
                    </li>
                  )
                  : null
              }
            </ol>
          )
          : null
      }
    </MetaTags>
  );
};

export default ScanRMeta;

ScanRMeta.propTypes = {
  href2: PropTypes.string.isRequired,
  href2Title: PropTypes.string.isRequired,
  href3: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
