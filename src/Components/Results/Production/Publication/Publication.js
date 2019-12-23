import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import SectionTitle from '../../Shared/SectionTitle';
import Informations from './Sections/Informations';
import Oa from '../Shared/Oa/Section';
import Authors from '../Shared/Authors/AuthorsSection';
import Affiliations from '../Shared/Affiliations/AffiliationsSection';

import Similars from '../Shared/Similars/Similars';

import {
  SectionProductions,
  SectionWhite,
  SectionPersonsBlue,
  SectionEntity,
} from '../../Shared/styles';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const messages = { fr: messagesFr, en: messagesEn };

/**
 * Publication
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Publication = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <Fragment>
      <SectionProductions id="Publication">
        <div className="container">
          <SectionTitle
            icon="fa-id-card"
            objectType="publications"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Publication.title']}
          />
          <Informations
            language={props.language}
            data={props.data}
          />
        </div>
      </SectionProductions>

      <SectionWhite id="AccessType">
        <div className="container">
          <SectionTitle
            lexicon="PublicationOA"
            icon="fa-folder-open"
            objectType="publications"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Publication.oa.title']}
          />
          <Oa
            language={props.language}
            data={props.data}
          />
        </div>
      </SectionWhite>

      <SectionPersonsBlue id="Authors">
        <div className="container">
          <SectionTitle
            icon="fa-folder-open"
            lexicon="PublicationAuthor"
            objectType="publications"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Authors.title']}
          />
          <Authors
            language={props.language}
            data={props.data}
          />
        </div>
      </SectionPersonsBlue>
      {
        (props.data && props.data.affiliations)
          ? (
            <SectionEntity id="Affiliations">
              <div className="container">
                <SectionTitle
                  lexicon="PublicationAffiliation"
                  icon="fa-folder-open"
                  objectType="publications"
                  language={props.language}
                  id={props.id}
                  title={messages[props.language]['Publication.affiliations.title']}
                />
                <Affiliations
                  language={props.language}
                  data={props.data}
                />
              </div>
            </SectionEntity>
          ) : null
      }
      <section id="Similars" className="py-3">
        <div className="container">
          <SectionTitle
            icon="fa-folder-open"
            lexicon="PublicationSimilar"
            language={props.language}
            title={messages[props.language]['Publication.similars']}
          />
          <Similars language={props.language} id={props.id} />
        </div>
      </section>
    </Fragment>
  </IntlProvider>
);

export default Publication;

Publication.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
