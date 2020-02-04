import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './TheConversationCard.scss';

/* Gestion des langues */


/**
 * TheConversationCard component
 * Url : .
 * Description : Carte avec info wiki
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class TheConversationCard extends Component {
  state= {
    // eslint-disable-next-line
    title: null,
    urlIframe: null,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const urlIframe = 'https://theconversation.com/profiles/'.concat(this.props.id);
    this.setState({ urlIframe });
  }


  render() {
    return (
      <div className={classes.TheConversationCard}>
        <div className={classes.Content}>
          {
            (this.state.urlIframe)
              ? (
                <iframe
                  title="theConversationIframe"
                  type="text/html"
                  width="100%"
                  height="492px"
                  src={this.state.urlIframe}
                  target="_parent"
                  frameBorder="0"
                />
              ) : null
          }
        </div>
      </div>
    );
  }
}

export default TheConversationCard;

TheConversationCard.propTypes = {
  id: PropTypes.string,
};
