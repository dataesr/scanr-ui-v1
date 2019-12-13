import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import useGetData from '../../../Hooks/useGetData';
import useScrollY from '../../../Hooks/useScrollY';
import useSearchAPI from '../../../Hooks/useSearchAPI';

import Errors from '../../Shared/Errors/Errors';
import { API_STRUCTURES_END_POINT } from '../../../config/config';
import getSelectKey from '../../../Utils/getSelectKey';

import SectionTitle from '../Shared/SectionTitle';
import ScanRMeta from '../../Shared/MetaTags/ScanRMeta';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import Portrait from './Sections/Portrait/Portrait';
// import Network from './Sections/Network/Network';
import Evaluations from './Sections/Evaluations/Evaluations';
import Team from './Sections/Team/Team';
import Projects from '../Shared/Projects/Projects';
import Productions from '../Shared/Productions/Productions';
import Ecosystem from './Sections/Ecosystem/Ecosystem';
// import Awards from './Sections/Awards/Awards';
import SimilarEntities from './Sections/SimilarEntities/SimilarEntities';
import Banner from '../../Shared/Banner/Banner';
import Loader from '../../Shared/LoadingSpinners/RouterSpinner';
import styles from '../../../style.scss';

import { SectionEntity, SectionGrey, SectionPersonsBlue } from '../Shared/styles';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/**
 * Entity
 * Url : /entite/:id
 * Description : Correspond à une entité (structure)
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Entity = (props) => {
  const scrollY = useScrollY();
  const { id } = props.match.params;
  const url = `${API_STRUCTURES_END_POINT}/structure`;
  const request = {
    searchFields: ['label', 'id'],
    pageSize: 4095,
    filters: {
      'institutions.structure.id': {
        type: 'MultiValueSearchFilter',
        op: 'all',
        values: [id],
      },
    },
  };
  const { data, isLoading, isError } = useGetData(url, id);
  const supervisorOf = useSearchAPI(`${API_STRUCTURES_END_POINT}/search`, request);
  if (isLoading || supervisorOf.isLoading) return <Loader color={styles.productionsColor} />;
  if (isError || supervisorOf.isError) return <Errors error={500} />;
  const messages = { fr: messagesFr, en: messagesEn };
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <React.Fragment>
        <ScanRMeta
          title={getSelectKey(data, 'label', props.language, 'fr')}
          href2="./recherche/structures?query="
          href2Title="Structures"
          href3={`./entite/${id}`}
        />
        <Header />
        <HeaderTitle
          language={props.language}
          label={getSelectKey(data, 'label', props.language, 'fr')}
          idPage="entity"
          id={id}
          isFull={scrollY === 0}
        />
        <SectionEntity id="Portrait">
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="structures"
              language={props.language}
              id={id}
              title="Portrait"
            >
              <FormattedHTMLMessage id="Entity.portrait" />
            </SectionTitle>
            <Portrait
              language={props.language}
              data={data}
              id={props.match.params.id}
            />
          </div>
        </SectionEntity>
        <SectionGrey id="Evaluations">
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="structures"
              language={props.language}
              id={id}
              title="Portrait"
            >
              <FormattedHTMLMessage id="Entity.evaluations" />
            </SectionTitle>
            <Evaluations
              language={props.language}
              data={data}
              id={id}
            />
          </div>
        </SectionGrey>
        <SectionPersonsBlue id="Team">
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="structures"
              language={props.language}
              id={id}
              title="Portrait"
            >
              <FormattedHTMLMessage id="Entity.team" />
            </SectionTitle>
            {
              (!supervisorOf.IsLoading && !supervisorOf.isError)
                ? (
                  <Team
                    language={props.language}
                    data={data}
                    childs={supervisorOf.data.results || []}
                    id={id}
                  />
                )
                : null
            }
          </div>
        </SectionPersonsBlue>
        <div id="Projects">
          <Projects
            language={props.language}
            match={props.match}
            childs={supervisorOf.data.results || []}
          />
        </div>

        <Banner
          language={props.language}
          labelKey="WhatAreOurSources"
          cssClass="BannerDark"
          url="/ressources"
        />

        <div id="Productions">
          <Productions
            language={props.language}
            match={props.match}
            childs={supervisorOf.data.results || []}
          />
        </div>
        <SectionEntity id="SimilarEntities">
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="structures"
              language={props.language}
              id={id}
              title="Portrait"
            >
              <FormattedHTMLMessage id="Entity.similars" />
            </SectionTitle>
            <SimilarEntities
              language={props.language}
              id={id}
            />
          </div>
        </SectionEntity>

        <div id="Ecosystem">
          <Ecosystem
            language={props.language}
            data={data.graph}
            id={id}
          />
        </div>

        { /*
        <div id="Network">
          <Network
            language={this.props.language}
            data={this.state.data}
            id={this.props.match.params.id}
          />
        </div>

        <Banner
          language={this.props.language}
          labelKey="Opendata"
          cssClass="BannerDeep"
          url="/opendata"
        />

        <div id="Ecosystem">
          <Ecosystem
            language={this.props.language}
            data={this.state.data.graph}
            id={this.props.match.params.id}
          />
        </div>

        <div id="Awards">
          <Awards
            language={this.props.language}
            data={this.state.data}
            id={this.props.match.params.id}
          />
        </div>

         <Banner
          language={this.props.language}
          labelKey="Appear"
          cssClass="BannerLight"
          url=""
        /> */ }

        <Footer />
      </React.Fragment>
    </IntlProvider>
  );
};

export default Entity;

Entity.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};
