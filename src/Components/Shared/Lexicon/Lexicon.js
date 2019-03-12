import React, { Component } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Lexicon.scss';

class Lexicon extends Component {
  state={
    opened: false,
  };

  togglePane = () => {
    this.setState(prevState => ({ opened: !prevState.opened }));
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    let panel = null;
    if (this.state.opened) {
      panel = (
        <div className={classes.Panel}>
          <button
            type="button"
            className={classes.ButtonClosePanel}
            onClick={this.togglePane}
          >
            x
          </button>
          panel
        </div>
      );
    }

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div className={`${classes.Lexicon} ${this.props.className}`}>
          <span className={classes.TextInfo}>
            <FormattedHTMLMessage
              id="Lexicon.title"
              defaultMessage="Lexicon.title"
            />
          </span>
          <button
            type="button"
            className={classes.Button}
            onClick={this.togglePane}
          >
            i
          </button>
          {panel}
        </div>
      </IntlProvider>
    );
  }
}

export default Lexicon;

Lexicon.propTypes = {
  className: PropTypes.string,
  language: PropTypes.string.isRequired,
};
