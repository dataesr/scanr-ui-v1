import React, { Component } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
// import scrollToElement from 'scroll-to-element';
import Switch from 'react-switch';

/* Gestion des langues */
import messagesFr from './translations/panel/fr.json';
import messagesEn from './translations/panel/en.json';

/* Chargement du lexique */
import glossaryTerms from './translations/terms/glossary.json';
import faqTerms from './translations/terms/faq.json';

/* SCSS */
import classes from './LexiconPanel.scss';

class Lexicon extends Component {
  state={
    opened: true,
    glossary: false,
  };

  togglePane = () => {
    this.setState(prevState => ({ opened: !prevState.opened }));
  }

  handleChange = (checked) => {
    console.log('here', checked);
    this.setState({ glossary: checked });
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    let panel = null;
    if (this.state.opened) {
      const terms = (this.state.glossary) ? glossaryTerms : faqTerms;

      const termsHtml = Object.keys(terms).map(term => (
        <li key={terms[term].label[this.props.language]} id={term}>
          <div className={classes.Title}>
            <span className={classes.Logo}>
              {
                (terms[term].icon)
                  ? <i className={terms[term].icon} />
                  : <i className="fas fa-file-alt" />
              }
            </span>
            {terms[term].label[this.props.language]}
          </div>
          <div className={classes.Description}>
            {terms[term].description[this.props.language]}
          </div>
        </li>
      ));

      panel = (
        <div className={classes.Panel}>
          <button type="button" className={classes.ButtonClosePanel} onClick={this.togglePane}>
            <i className="fa fa-times" />
          </button>

          <div className={classes.Content}>
            <h2>
              <span>
                <FormattedHTMLMessage
                  id="Lexicon.panel.glossary.title"
                  defaultMessage="Lexicon.panel.glossary.title"
                />
              </span>
              <Switch
                onChange={e => this.handleChange(e)}
                checked={this.state.glossary}
                onColor="#fff"
                onHandleColor="#3778bb"
                offColor="#fff"
                offHandleColor="#3778bb"
                height={16}
                className={classes.Switch}
              />
              <span>
                <FormattedHTMLMessage
                  id="Lexicon.panel.faq.title"
                  defaultMessage="Lexicon.panel.faq.title"
                />
              </span>
            </h2>
            <hr />
            <ul>
              {termsHtml}
            </ul>
          </div>
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
  target: PropTypes.string,
};
