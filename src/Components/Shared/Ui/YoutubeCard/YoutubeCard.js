import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './YoutubeCard.scss';

/* Gestion des langues */


/**
 * YoutubeCard component
 * Url : .
 * Description : Carte avec info wiki
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class YoutubeCard extends Component {
  state= {
    // eslint-disable-next-line
    title: null,
    urlIframe: null,
  }

  componentDidMount() {
    this.getData();
  }


  getData = () => {
    const youtubeUrl = this.props.url;
    let urlIframe = null;
    if (youtubeUrl.indexOf('youtube.com/user') !== -1) {
      const regex = /.*youtube.com\/user\//gi;
      const userYoutube = youtubeUrl.replace(regex, '');
      urlIframe = 'http://www.youtube.com/embed?listType=user_uploads&list='.concat(userYoutube);
    } else if (youtubeUrl.indexOf('youtube.com/channel/UC') !== -1) {
      const regex = /.*youtube.com\/channel\/UC/gi;
      const userYoutube = youtubeUrl.replace(regex, 'UU');
      urlIframe = 'https://www.youtube.com/embed/videoseries?list='.concat(userYoutube);
    } else if (youtubeUrl.indexOf('youtube.com/watch') !== -1) {
      const regex = /.*=/gi;
      const userYoutube = youtubeUrl.replace(regex, '');
      urlIframe = 'https://www.youtube.com/embed/'.concat(userYoutube);
    } else if (youtubeUrl.indexOf('youtube.com/embed') !== -1) {
      urlIframe = youtubeUrl;
    }
    this.setState({ urlIframe });
  }


  render() {
    return (
      <div className={classes.YoutubeCard}>
        <div className={classes.Content}>
          {
            (this.state.urlIframe)
              ? (
                <iframe
                  title="youtubeIframe"
                  type="text/html"
                  width="100%"
                  height="492px"
                  src={this.state.urlIframe}
                  frameBorder="0"
                />
              ) : null
          }
        </div>
      </div>
    );
  }
}

export default YoutubeCard;

YoutubeCard.propTypes = {
  url: PropTypes.string,
};
