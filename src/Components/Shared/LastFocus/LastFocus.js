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
                    schema={oneFocus.schema}
                    tags={oneFocus.tags}
                    title={oneFocus.title}
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
      tags: ['#SATT', '#transfert', '#technonologies'],
      title: 'La carte des SATT',
      type: 'map',
      url: '/focus/carte-satt-2019',
      schema: 'structures',
    },
    {
      tags: ['#Thèses', '#PhD', '#EcolesDoctorales'],
      title: 'Quels sont les thèmes majeurs des thèses en France aujourd\'hui',
      type: 'bubble',
      url: '/focus/themes-theses-2018',
      schema: 'publications',
    },
    {
      tags: ['#InstitutUniversitaireDeFrance', '#IUF'],
      title: "Lauréats de l'Institut Universitaire de France: Qui sont ils ?",
      type: 'treemap',
      url: '/focus/iuf',
      schema: 'persons',
    },
    {
      tags: ['#youtube', '#vulgarisation'],
      title: 'Vulgarisation scientifique sur Youtube',
      type: 'youtube',
      url: '/focus/youtube',
      schema: 'persons',
    },
  ],
};

// {
//   tags: ['#theses', '#tag2', '#tag3'],
//   title: 'Quels sont les thèmes majeurs des thèses en France aujourd\'hui',
//   type: 'bubble',
//   url: '/focus/themes-theses-2018',
//   schema: 'publication',
// },
// {
//   tags: ['#prix', '#IUF', '#tag3'],
//   title: "Lauréats de l'Institut Universitaire de France: Qui sont ils ?",
//   type: 'treemap',
//   url: '/focus/iuf',
//   schema: 'person',
// },
