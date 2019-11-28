import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import EntityCard from './ResultCards/EntityCard';
import PersonCard from './ResultCards/PersonCard';
import ProjectCard from './ResultCards/ProjectCard';
import PublicationCard from './ResultCards/PublicationCard';
import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';
import GraphSpinner from '../../Shared/LoadingSpinners/GraphSpinner';

import classes from './AllResults.scss';


const SearchResults = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  const CardsComponents = {
    structures: EntityCard,
    persons: PersonCard,
    projects: ProjectCard,
    publications: PublicationCard,
  };

  return (
    Object.keys(CardsComponents).map((section, index) => {
      const BgClass = ([0, 2].includes(index)) ? 'gris' : 'blanc';
      // const cardColor = ([0, 2].includes(index)) ? 'CardWhite' : 'CardGrey';
      const cardColor = 'CardWhite';
      const CardsToShow = CardsComponents[section];
      const bgUrl = `./img/poudre-${section}_fond_${BgClass}.jpg`;
      const sizes = ['100%', '80%', '75%', '70%'];
      const positions = ['-115% -15%', '0 -25%', '100% -50%', '10% -30%'];
      const sectionStyle = {
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: sizes[index],
        backgroundPosition: positions[index],
        backgroundRepeat: 'no-repeat',
      };
      let subTitle = 'searchResults.relevance';
      subTitle = (props.preview[section].count === 0) ? 'searchResults.noResults' : subTitle;
      subTitle = (props.preview[section].count === 1) ? 'searchResults.singleResult' : subTitle;
      const Title = (props.preview[section].count > 1) ? `searchResults.${section}` : `searchResults.singular.${section}`;
      if (props.preview[section].isLoading) {
        return (
          <IntlProvider locale={props.language} messages={messages[props.language]}>
            <section>
              <div style={sectionStyle} className={`pt-5 pb-5 ${classes[BgClass]}`}>
                <div className="container">
                  <div className="row d-flex flex-row justify-content-between">
                    <div className={`${classes.headers}`}>
                      <h2>
                        {`${props.preview[section].count.toLocaleString(props.language)} `}
                        <FormattedHTMLMessage
                          id={Title}
                          defaultMessage={Title}
                        />
                      </h2>
                      <p>
                        <FormattedHTMLMessage
                          id={subTitle}
                          defaultMessage={subTitle}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <GraphSpinner />
              </div>
            </section>
          </IntlProvider>
        );
      }
      return (
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <section>
            <div style={sectionStyle} className={`pt-5 pb-5 ${classes[BgClass]}`}>
              <div className="container">
                <div className="row d-flex flex-row justify-content-between">
                  <div className={`${classes.headers}`}>
                    <h2>
                      {`${props.preview[section].count.toLocaleString(props.language)} `}
                      <FormattedHTMLMessage
                        id={Title}
                        defaultMessage={Title}
                      />
                    </h2>
                    <p>
                      <FormattedHTMLMessage
                        id={subTitle}
                        defaultMessage={subTitle}
                      />
                    </p>
                  </div>
                  {
                    (props.preview[section].count > 6)
                      ? (
                        <div
                          onClick={() => props.apiChangeHandler(section)}
                          onKeyPress={() => props.apiChangeHandler(section)}
                          role="button"
                          tabIndex={0}
                        >
                          <ButtonToPage
                            className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
                          >
                            <FormattedHTMLMessage
                              id="searchResults.viewAll"
                              defaultMessage="searchResults.viewAll"
                            />
                          </ButtonToPage>
                        </div>
                      )
                      : null
                  }
                </div>
                <div className="row d-flex flex-wrap justify-content-between">
                  {
                    props.preview[section].data.map(res => (
                      <div className={classes.card} key={JSON.stringify(res)}>
                        <CardsToShow
                          data={res.value}
                          highlights={res.highlights}
                          small
                          language={props.language}
                          cardColor={cardColor}
                        />
                      </div>
                    ))
                  }
                  {
                    ([5, 2].includes(props.preview[section].count)) ? (<div className={classes.card} />) : null
                  }
                </div>
              </div>
            </div>
          </section>
        </IntlProvider>
      );
    })
  );
};

export default SearchResults;

SearchResults.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  preview: PropTypes.object,
  apiChangeHandler: PropTypes.func,
};
