import React, { Component } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../config/config';
import PublicationCard from '../../Search/SearchResults/ResultCards/PublicationCard';
import transformRequest from '../../../Utils/transformRequest';
import classes from './GraphCard.scss';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';
import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';

export default class PublicationList extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const request = { ...this.props.request };
    /* eslint-disable-next-line */
    Axios.post(API_PUBLICATIONS_SEARCH_END_POINT, transformRequest(request))
      .then((response) => {
        this.setState({ data: response.data.results });
      })
      .catch((error) => {
        /* eslint-disable-next-line */
        console.log(error);
      });
  }

  render = () => (
    <div className={`w-100 ${classes.graphCard}`}>
      <GraphTitles
        lexicon={this.props.lexicon}
        language={this.props.language}
        title={this.props.title}
        subtitle={this.props.subtitle}
      />
      <div className="col-md-6">
        {
          (this.props.href)
            ? (
              <ButtonToPage
                className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
                target="_blank"
                url={this.props.href}
              >
                <FormattedHTMLMessage id="Focus.button.explorScanr" />
              </ButtonToPage>
            )
            : null
        }
      </div>
      <div className="container">
        <ul className={`row ${classes.Ul}`}>
          {
            this.state.data.map((item, i) => (
              /* eslint-disable-next-line */
              <li key={`${item.value}_${i}`} className={`col-md-4 ${classes.Li}`}>
                <PublicationCard
                  data={item.value}
                  small
                  language={this.props.language}
                />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

PublicationList.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
  subtitle: PropTypes.string.isRequired,
  lexicon: PropTypes.string,
  href: PropTypes.string,
};
