import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import LexiconModal from '../../Shared/Lexicon/LexiconModal/LexiconModal';
import ButtonToSearch from '../../Shared/Ui/Buttons/ButtonToSearch';

/* SCSS */
import classes from './MostActiveThemes.scss';


const MostActiveThemes = props => (
  <section className={classes.MostActiveThemes}>
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
          <div className={classes.Lib}>
            <FormattedHTMLMessage
              id="Home.MostActiveThemes.lib"
              defaultMessage="Home.MostActiveThemes.lib"
            />
            &nbsp;
            <LexiconModal language={props.language} target="top10">
              <i className="fa fa-info-circle" />
            </LexiconModal>
          </div>
          <div className={classes.Lib2}>
            <FormattedHTMLMessage
              id="Home.MostActiveThemes.lib2"
              defaultMessage="Home.MostActiveThemes.lib2"
            />
          </div>
        </div>
        <div className="col-lg-7">
          <ul>
            {
              props.data.map(item => (
                <li>
                  <ButtonToSearch key={item.labelFr} href={`/recherche/all?query=${item.query}`} className={classes.Tags}>
                    {(props.language === 'fr') ? item.labelFr : item.labelEn}
                  </ButtonToSearch>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default MostActiveThemes;

MostActiveThemes.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
