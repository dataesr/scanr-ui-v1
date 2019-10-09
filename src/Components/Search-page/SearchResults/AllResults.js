import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import EntityCard from './ResultCards/EntityCard';
import PersonCard from './ResultCards/PersonCard';
import ProjectCard from './ResultCards/ProjectCard';
import PublicationCard from './ResultCards/PublicationCard';
import ButtonToPageLinkLess from '../../Shared/Ui/Buttons/ButtonToPageLinkLess';


import classes from './AllResults.scss';


const SearchResults = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const scanRcolor = '#3778bb';
  const cardsGrey = '#e9ecf1';
  if (props.isLoading) {
    return (
      <div className="row justify-content-center pt-5 mt-5">
        <GridLoader
          color={scanRcolor}
          loading={props.isLoading}
        />
      </div>
    );
  }
  const CardsComponents = {
    structures: EntityCard,
    persons: PersonCard,
    projects: ProjectCard,
    publications: PublicationCard,
  };

  return (
    Object.keys(CardsComponents).map((section, index) => {
      const BgClass = ([0, 2].includes(index)) ? 'gris' : 'blanc';
      const CardColor = ([0, 2].includes(index)) ? null : cardsGrey;
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
      return (
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <section>
            <div style={sectionStyle} className={`pt-5 pb-5 ${classes[BgClass]}`}>
              <div className="container">
                <div className="row d-flex flex-row justify-content-between">
                  <div className={`${classes.headers}`}>
                    <h2>
                      {`${props.preview[section].count} `}
                      <FormattedHTMLMessage
                        id={`searchResults.${section}`}
                        defaultMessage={`searchResults.${section}`}
                      />
                    </h2>
                    {
                      (props.preview[section].count === 0)
                        ? (
                          <p>
                            <FormattedHTMLMessage
                              id="searchResults.noResults"
                              defaultMessage="searchResults.noResults"
                            />
                          </p>
                        )
                        : (
                          <p>
                            <FormattedHTMLMessage
                              id="searchResults.relevance"
                              defaultMessage="searchResults.relevance"
                            />
                          </p>
                        )
                    }
                  </div>
                  <div
                    onClick={() => props.apiChangeHandler(section)}
                    onKeypress={() => props.apiChangeHandler(section)}
                    role="button"
                    tabIndex={0}
                  >
                    <ButtonToPageLinkLess>
                      <FormattedHTMLMessage
                        id="searchResults.viewAll"
                        defaultMessage="searchResults.viewAll"
                      />
                    </ButtonToPageLinkLess>
                  </div>
                </div>
                <div className="row d-flex flex-wrap justify-content-between">
                  {
                    props.preview[section].data.map(res => (
                      <div className={classes.card} key={res.value.id + res.value.label}>
                        <CardsToShow
                          data={res}
                          size="small"
                          highlights={false}
                          language={props.language}
                          bgColor={CardColor}
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
