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
import getSelectKey from '../../../Utils/getSelectKey';
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

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';
// scss styles
import styles from '../../../style.scss';
/**
 * Publication
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Project = (props) => {
  const scrollY = useScrollY();
  const { data, isLoading, isError } = useGetData(
    API_PROJECTS_END_POINT, props.match.params.id,
  );
  if (isLoading) return <Loader color={styles.productionsColor} />;
  if (isError) return <Errors />;
  const msg = { en: messagesEn, fr: messagesFr };
  const BG = {
    padding: '1em 0px',
    backgroundSize: '40%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: styles.scanrlightgreyColor,
    backgroundPosition: 'bottom 0 right 0',
  };

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
        <section id="Informations" style={BG}>
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
        </section>
        <section id="Financial" style={BG}>
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
        </section>
        <section id="Programs" style={BG}>
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
        </section>
        <section id="Description" style={BG}>
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
        </section>
        <section id="Participants" style={BG}>
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              objectType="projects"
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
        </section>
        <section id="Participants" style={BG}>
          <div className="container">
            <SectionTitle
              icon="fa-folder-open"
              objectType="projects"
              language={props.language}
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Project.productions" />}
            />
            <Productions
              language={props.language}
              data={data.publications}
              id={props.match.params.id}
            />
          </div>
        </section>
        <section id="Similars" style={BG}>
          <div className="container">
            <SectionTitle
              icon="fa-th"
              language={props.language}
              id={props.match.params.id}
              title={<FormattedHTMLMessage id="Project.similars" />}
            />
            <Similars
              language={props.language}
              coContributors={data.coContributors}
              id={props.match.params.id}
            />
          </div>
        </section>
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
