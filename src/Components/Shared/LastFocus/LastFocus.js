import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';
import FocusCard from '../Ui/FocusCard/FocusCard';

/* SCSS */
import classes from './LastFocus.scss';

const LastFocus = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.LastFocus}>
        <div className="container">
          <div className="row d-flex align-items-center px-1 py-4">
            <h2 className={`flex-grow-1 m-0 ${classes.Title}`}>
              <FormattedHTMLMessage
                id="LastFocus.Title"
                defaultMessage="LastFocus.Title"
              />
            </h2>
            <ButtonToPage
              className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
              target="_blank"
              url="/focus"
            >
              <FormattedHTMLMessage
                id="LastFocus.AllFocus"
                defaultMessage="LastFocus.AllFocus"
              />
            </ButtonToPage>
          </div>

          <div className="row pb-4">
            {
              props.focusList.map(oneFocus => (
                <div className={`col-lg-4 ${classes.CardContainer}`} key={oneFocus.title}>
                  <FocusCard
                    schema={oneFocus.api}
                    tags={oneFocus.tags[props.language]}
                    title={oneFocus.title[props.language]}
                    type={oneFocus.type}
                    url={oneFocus.url}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default LastFocus;

LastFocus.propTypes = {
  language: PropTypes.string.isRequired,
  focusList: PropTypes.array,
};
LastFocus.defaultProps = {
  focusList: [
    {
      tags: {
        fr: ['#satt', '#transfert', '#technologies'],
        en: ['#satt', '#transfert', '#technologies'],
      },
      title: {
        fr: 'Sociétés d’Accélération du Transfert de Technologies (SATT)',
        en: 'French technology transfer offices (SATT, Sociétés d’Accélération du Transfert de Technologies)',
      },
      type: 'map',
      url: '/focus/carte-satt-2019',
      api: 'structures',
    },
    {
      tags: {
        fr: ['Thèses', '#EcolesDoctorales'],
        en: ['PhD', '#DoctoralSchools'],
      },
      title: {
        fr: 'Les thèses soutenues en 2018. Sur quels thèmes ?',
        en: '2018 thesis in france. Which thematics?',
      },
      type: 'bubble',
      url: '/focus/themes-theses-2018',
      api: 'publications',
    },
    {
      tags: {
        fr: ['#InstitutUniversitaireDeFrance', '#IUF'],
        en: ['#InstitutUniversitaireDeFrance', '#IUF'],
      },
      title: {
        fr: "Les nominations 2019 à l'Institut Universitaire de France",
        en: 'Persons distinguished by the Institut Universitaire de France in 2019',
      },
      type: 'treemap',
      url: '/focus/iuf',
      api: 'persons',
    },
    {
      tags: {
        fr: ['#youtube', '#vulgarisation'],
        en: ['#youtube', '#popularization'],
      },
      title: {
        fr: 'Chaînes scientifiques sur Youtube dans scanR',
        en: 'Scientific Youtube channels in scanR',
      },
      type: 'youtube',
      url: '/focus/youtube',
      api: 'persons',
    },
    {
      tags: {
        fr: ['#SoftwareHeritage', '#CodeSource'],
        en: ['#SoftwareHeritage', '#SourceCode'],
      },
      title: {
        fr: 'Productions avec un lien Software Heritage dans scanR',
        en: 'Productions with a link to Software Heritage in scanR',
      },
      type: 'software-heritage',
      url: '/focus/software_heritage',
      api: 'publications',
    },
    {
      tags: {
        fr: ['#MaThèseEn180s', '#MT180', '#vulgarisation'],
        en: ['#MaThèseEn180s', '#MT180', '#popularization'],
      },
      title: {
        fr: "Finalistes et lauréat du concours 'Ma Thèse en 180s' dans scanR",
        en: "Finalists and winner of the competition 'Ma Thèse en 180s' in scanR",
      },
      type: 'mt180',
      url: '/focus/mt180',
      api: 'persons',
    },
  ],
};
