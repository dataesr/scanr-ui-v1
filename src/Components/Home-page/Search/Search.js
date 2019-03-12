import React from 'react';

import classes from './Search.scss';
import Background from './poudre-header-home-yellow.jpg';

const sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: 'top 0 left 50%',
  backgroundSize: '50%',
};

const Search = () => (
  <div style={sectionStyle} className={classes.Search}>

    Search HomePage Component

  </div>
);

export default Search;
