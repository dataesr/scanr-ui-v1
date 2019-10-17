import React from 'react';
import PropTypes from 'prop-types';

const SVG = props => (
  <svg
    width={props.width}
    style={props.style}
    height="40%"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${props.className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 30 100 50"
  >
    <g id="icon-fiche-prix">
      <g>
        <g>
          <rect x="38" y="28.9" width="6.76" height="30.04" transform="matrix(0.82, -0.57, 0.57, 0.82, -17.71, 31.68)" fill="#fff" stroke={props.fill} strokeLinecap="round" strokeLinejoin="round" />
          <rect x="43.6" y="40.54" width="30.04" height="6.76" transform="translate(-10.99 66.74) rotate(-55)" fill="#fff" stroke={props.fill} strokeLinecap="round" strokeLinejoin="round" />
          <g>
            <g>
              <path d="M50,69.32A13.09,13.09,0,1,1,63.09,56.23,13.11,13.11,0,0,1,50,69.32Z" fill={props.fill} />
              <path d="M50,44.13A12.09,12.09,0,1,1,37.91,56.23,12.11,12.11,0,0,1,50,44.13m0-2A14.09,14.09,0,1,0,64.09,56.23,14.09,14.09,0,0,0,50,42.13Z" fill="#fff" />
            </g>
            <circle cx="50" cy="56.23" r="14.09" fill="none" stroke={props.fill} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <path d="M51.28,50.7v11H49v-7.9h-.09a1.3,1.3,0,0,1-.74.51,4.55,4.55,0,0,1-1.42.18v-2A2.39,2.39,0,0,0,48,52.29a2,2,0,0,0,.68-.63A2.24,2.24,0,0,0,49,51,3.17,3.17,0,0,0,49,50.7Z" fill="#fff" />
      </g>
    </g>
  </svg>
);

export default SVG;

SVG.defaultProps = {
  style: {},
  fill: '#000',
  width: '60%',
  className: '',
};

SVG.propTypes = {
  style: PropTypes.object,
  fill: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};
