import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';


import EntityCard from './ResultCards/EntityCard';
import PersonCard from './ResultCards/PersonCard';
import ProjectCard from './ResultCards/ProjectCard';
import PublicationCard from './ResultCards/PublicationCard';
import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';
import GraphSpinner from '../../Shared/LoadingSpinners/GraphSpinner';

import classes from './AllResults.scss';


const SearchResults = (props) => {
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
      if (props.preview[section].isLoading) {
        return <GraphSpinner />;
      }
      return (
        <section>
          <div style={sectionStyle} className={`pt-5 pb-5 ${classes[BgClass]}`}>
            <div className="container">
              <div className="row d-flex flex-row justify-content-between">
                <div className={`${classes.headers}`}>
                  <h2>
                    <FormattedHTMLMessage
                      id={`Search.Results.${section}.results`}
                      values={{ count: props.preview[section].count }}
                    />
                  </h2>
                  <p>
                    {
                      (props.preview[section].count !== 0)
                        ? (
                          <FormattedHTMLMessage
                            id={`Search.Results.${section}.subtitles`}
                            values={{ count: props.preview[section].count }}
                          />
                        )
                        : null
                    }
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
                        <ButtonToPage className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}>
                          <FormattedHTMLMessage id="Search.Results.viewAll" />
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
