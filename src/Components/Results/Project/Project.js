// Packages
import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
// Hooks
import useGetData from '../../../Hooks/useGetData';
import useScrollY from '../../../Hooks/UseScrollY';

// Config
import { API_PROJECTS_END_POINT } from '../../../config/config';

// Components
import SectionTitle from '../Shared/SectionTitle';
import ScanRMeta from '../../Shared/MetaTags/ScanRMeta';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import Participants from './Sections/Participants/Participants';
import Productions from './Sections/Productions/Productions';
import Informations from './Sections/Informations/Informations';
import Financial from './Sections/Financial/Financial';
import Programs from './Sections/Programs/Programs';
import Similars from './Sections/Similars/Similars';
import Loader from '../../Shared/LoadingSpinners/RouterSpinner';
import Errors from '../../Shared/Errors/Errors';
import EmptySection from '../Shared/EmptySection/EmptySection';

// Utils
import getSelectKey from '../../../Utils/getSelectKey';

// Styles
import {
  SectionProjects,
  SectionProductions,
  SectionWhite,
  SectionGrey,
} from '../Shared/styles';
import styles from '../../../style.scss';

// Languages
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/**
 * Project Page
 * Url : /project/:id
 * Description : This page is responsible for fetching project data and displaying
 *               global Project page Layout, passing data to every section as props.
 * Responsive : true
 * Accessible : ?
 * Tests unitaires : false
*/
const Project = (props) => {
  const scrollY = useScrollY();
  const { data, isLoading, isError } = useGetData(API_PROJECTS_END_POINT, props.match.params.id);
  if (isLoading) return <Loader color={styles.productionsColor} />;
  if (isError) return <Errors error={500} />;
  const msg = { en: messagesEn, fr: messagesFr };
  return (
    <IntlProvider locale={props.language} messages={msg[props.language]}>
      <React.Fragment>
        <ScanRMeta
          title={getSelectKey(data, 'label', props.language, 'default')}
          href2="./recherche/projects?query="
          href2Title="Projets"
          href3={`./project/${props.match.params.id}`}
        />
        <Header />
        <HeaderTitle
          language={props.language}
          label={getSelectKey(data, 'label', props.language, 'default')}
          idPage="projects"
          id={data.id}
          isFull={scrollY === 0}
        />
        <SectionProjects id="Informations">
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="projects"
              language={props.language}
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Project.informations" />}
            />
            <Informations
              language={props.language}
              data={data}
            />
          </div>
        </SectionProjects>
        <SectionWhite id="Financial">
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="projects"
              language={props.language}
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Project.financial" />}
            />
            <Financial
              language={props.language}
              data={data}
            />
          </div>
        </SectionWhite>
        <SectionGrey id="Programs">
          <div className="container">
            <SectionTitle
              icon="fa-id-card"
              objectType="projects"
              language={props.language}
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Project.programs" />}
            />
            <Programs
              language={props.language}
              data={data}
            />
          </div>
        </SectionGrey>
        <SectionProjects id="Description" alternative>
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              objectType="projects"
              language={props.language}
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Project.description" />}
            />
            <div className="row">
              <div className="col-12">
                {getSelectKey(data, 'description', props.language, 'default') || <EmptySection />}
              </div>
            </div>
          </div>
        </SectionProjects>
        <SectionProductions id="Productions">
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              objectType="projects"
              language={props.language}
              lexicon="ProjectProduction"
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Project.productions" />}
            />
            <Productions
              language={props.language}
              data={data.publications}
              id={props.match.params.id}
            />
          </div>
        </SectionProductions>
        <SectionWhite id="Participants">
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              objectType="projects"
              lexicon="ProjectParticipant"
              language={props.language}
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Project.participants" />}
            />
            <Participants
              language={props.language}
              data={data.participants}
              id={props.match.params.id}
            />
          </div>
        </SectionWhite>
        <SectionProjects id="Similars">
          <div className="container">
            <SectionTitle
              icon="fa-th"
              language={props.language}
              lexicon="ProjectSimilar"
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Project.similars" />}
            />
            <Similars
              language={props.language}
              coContributors={data.coContributors}
              id={props.match.params.id}
            />
          </div>
        </SectionProjects>
        <Footer />
      </React.Fragment>
    </IntlProvider>
  );
};

export default Project;

Project.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};
