import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { API_PUBLICATIONS_END_POINT } from '../../../config/config';
import getSelectKey from '../../../Utils/getSelectKey';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../Entity-page/HeaderTitle/HeaderTitle';

import Publication from './Publication/Publication';
import Thesis from './Thesis/Thesis';

/**
 * Production
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Production extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    // eslint-disable-next-line
    console.log(this.props.match.params);
    const { id } = this.props.match.params;
    // const id = 'doi10.10072%2525F978-3-319-24195-1_10';
    // const id = 'these2018TOU30090';
    // const id = 'doi10.10072%F978-3-319-24195-1_10';
    this.getData(id);
  }

  getData(id) {
    // Récupéraion des données de l'entité
    const url = `${API_PUBLICATIONS_END_POINT}/${id}`;
    // const url = 'https://scanr-preprod.sword-group.com/api/v2/publications/doi10.10072%252f978-3-319-24195-1_10';
    Axios.get(url)
      .then((response) => {
        this.setState({ data: response.data });
        /* eslint-disable-next-line */
      }).catch(e => console.log('erreur=>', e));
  }

  renderPublication = () => (
    <Fragment>
      <Publication
        language={this.props.language}
        data={this.state.data}
      />
    </Fragment>
  )

  renderThesis = () => (
    <Fragment>
      <Thesis
        language={this.props.language}
        data={this.state.data}
      />
    </Fragment>
  )

  renderPattent = () => (
    <Fragment>
      Brevet
    </Fragment>
  )

  render() {
    if (!this.state.data) {
      return <Fragment>Chargement ...</Fragment>;
    }
    let content = null;
    if (this.state.data.productionType === 'publication') {
      content = this.renderPublication();
    } else if (this.state.data.productionType === 'thesis') {
      content = this.renderThesis();
    } else if (this.state.data.productionType === 'pattent') {
      content = this.renderPattent();
    }

    return (
      <Fragment>
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <HeaderTitle
          language={this.props.language}
          label={getSelectKey(this.state.data, 'title', this.props.language, 'default')}
        />
        {content}
        <Footer language={this.props.language} />
      </Fragment>
    );
  }
}

export default Production;

Production.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
