import React, { useContext, useState, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Markdown from 'markdown-to-jsx';

import { GlobalContext } from '../../../../GlobalContext';

/* Gestion des langues */
import messagesPanelFr from './translations/fr.json';
import messagesPanelEn from './translations/en.json';

/* Chargement du lexique */
import glossaryTerms from '../../terms/glossary.json';

/* SCSS */
import classes from './LexiconModal.scss';

const LexiconModal = (props) => {
  const context = useContext(GlobalContext);
  const [isActive, setActive] = useState(false);

  const messagesPanel = { fr: messagesPanelFr, en: messagesPanelEn };

  const termObject = glossaryTerms.find(el => el.key === props.target);
  const term = termObject.label[context.language];
  const definition = termObject.definition[context.language];

  return (
    <IntlProvider locale={context.language} messages={messagesPanel[context.language]}>
      <Fragment>
        <Modal
          show={isActive}
          onHide={() => setActive(!isActive)}
          className={classes.LexiconModal}
          size="lg"
        >
          <Modal.Header closeButton className={classes.Header}>
            <p className={classes.Title}>
              <i className="fas fa-bookmark" />
              <FormattedHTMLMessage id="lexicon" />
            </p>
          </Modal.Header>
          <Modal.Body className={classes.Content}>
            <p className={classes.Term}>
              {term}
            </p>
            <p className={classes.Definition}>
              <Markdown>
                {definition}
              </Markdown>
            </p>
          </Modal.Body>
          <Modal.Footer className={classes.Footer}>
            <a href="/glossaire" target="_blank" rel="noopener noreferrer">
              <FormattedHTMLMessage id="fullLexicon" />
              &nbsp;
              <i className="fas fa-external-link-alt" />
            </a>
          </Modal.Footer>
        </Modal>
        {/* eslint-disable-next-line */}
        <span onClick={() => setActive(!isActive)}>
          {props.children}
        </span>
      </Fragment>
    </IntlProvider>
  );
};

export default LexiconModal;

LexiconModal.propTypes = {
  children: PropTypes.any.isRequired,
  target: PropTypes.string.isRequired,
};
