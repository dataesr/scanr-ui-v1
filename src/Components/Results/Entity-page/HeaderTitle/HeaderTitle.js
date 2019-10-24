import React, { Component } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './HeaderTitle.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

class HeaderTitle extends Component {
  state = {
    selectedOption: '',
  };

  handleChange = (e) => {
    this.setState({ selectedOption: e.target.value });
    this.props.handleChangeForScroll(e.target.value);
  };

  render() {
    const list = [];
    switch (this.props.idPage) {
      case 'Entity':
        list.push('Portrait');
        list.push('Network');
        list.push('Team');
        list.push('Projects');
        list.push('Productions');
        list.push('Ecosystem');
        list.push('Awards');
        list.push('SimilarEntities');
        list.push('LastEntityFocus');
        break;
      case 'Person':
        list.push('Informations');
        list.push('Production');
        list.push('CoAuthors');
        break;
      case 'Project':
        list.push('Informations');
        list.push('Financial');
        list.push('Programs');
        list.push('Participants');
        list.push('Productions');
        break;
      case 'Thesis':
        list.push('Thesis');
        list.push('AccessType');
        list.push('Authors');
        list.push('Affiliations');
        break;
      case 'Publication':
        list.push('Publication');
        list.push('AccessType');
        list.push('Authors');
        list.push('Affiliations');
        break;
      default:
        break;
    }
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <section className={classes.HeaderTitle}>
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className={classes['breadcrumb-item']}>
                      <a href="/">{messages[this.props.language].Home}</a>
                    </li>
                    <li className={classes['breadcrumb-item']}>
                      <a href="/recherche/all">{messages[this.props.language].Search}</a>
                    </li>
                    <li className={`${classes['breadcrumb-item']} ${classes.ItemActive}`}>{messages[this.props.language][this.props.idPage]}</li>
                  </ol>
                </nav>
                <div className={classes.Title}>
                  {this.props.label}
                </div>
              </div>
              <div className={`col pr-0 ${classes.ColToDelete}`}>
                <div className={`form-group ${classes.NavBox}`}>
                  {/* eslint-disable-next-line */}
                  <label htmlFor="headerTitleSelect">
                    <FormattedHTMLMessage id="HeaderTitle.label1" />

                    <select id="headerTitleSelect" className="form-control" onChange={this.handleChange} value={this.state.selectedOption}>
                      {
                        list.map(item => (
                          <option value={item}>{messages[this.props.language][`${this.props.idPage}.${item}`]}</option>
                        ))
                      }
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </IntlProvider>
    );
  }
}

export default HeaderTitle;

HeaderTitle.propTypes = {
  language: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  idPage: PropTypes.string.isRequired,
  handleChangeForScroll: PropTypes.func,
};
