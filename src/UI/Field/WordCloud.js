import React from 'react';
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import PropTypes from 'prop-types';

import classes from './Field.css';

const style = {
  flex: '1',
  fontFamily: 'sans-serif',
  fontSize: 20,
  color: () => randomColor({
    hue: '#00D1B2',
  }),
  padding: 5,
};


const wordCloud = props => (
  <div className={classes.TagCloud}>
    <TagCloud className={classes.TagCloud} style={style}>
      {props.words.map(word => (
        <div key={word}>{word}</div>
      ))}
    </TagCloud>
  </div>);


wordCloud.propTypes = {
  words: PropTypes.array,
};


export default wordCloud;
