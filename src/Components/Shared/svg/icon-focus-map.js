import React from 'react';
import PropTypes from 'prop-types';

const SVG = props => (
  <svg
    width={props.width}
    style={props.style}
    height={props.width}
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${props.className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <g>
        <g>
          <path d="M58.71,110a1.24,1.24,0,0,0-.85-.41l-3-.19-3.51-2.81a1.25,1.25,0,0,0-1.69.12l-1.33,1.41-4.28.51-1.75-2.36a1.25,1.25,0,0,0-1-.51,1.27,1.27,0,0,0-.38.06l-1.72.55-5.69-5.09a1.25,1.25,0,0,0-.6-.3l-1.32-.25,2.79-3.15a1.25,1.25,0,0,0,.29-.58l3.71-18.1.42.45a1.25,1.25,0,0,0,.39.28l1.09.49a1.25,1.25,0,0,0,1.52-1.88l-2.94-4,1-3.76a1.25,1.25,0,0,0-.27-1.15L32,60.71l1.3-.76a1.25,1.25,0,0,0,.35-1.85l-2-2.6.43-2A1.25,1.25,0,0,0,31.15,52L26,50.66,26,50.33a1.25,1.25,0,0,0-1.23-1l-.26,0-1.27.27-2.14-3a1.25,1.25,0,0,0-1-.53l-.22,0-2.32.41-.89-1.12.57-.52a1.25,1.25,0,0,0,.18-1.63l-1.71-2.47.78-1.2,2.72.15,1.07,1.48a1.25,1.25,0,0,0,1.49.42l1.85-.76a1.25,1.25,0,0,0,.76-1l0-.26,2.17.19,3.16,3.46a1.25,1.25,0,0,0,1.75.09L32.92,42l6.54.3a1.25,1.25,0,0,0,1.19-1.62l-3-9.5h1.62l1.53,3.6a1.25,1.25,0,0,0,1.49.71l1.13-.32,3.32,1.27a1.25,1.25,0,0,0,.92,0l3.71-1.53a1.25,1.25,0,0,0,.77-1.16V31.87L56,29.55h2.51a1.25,1.25,0,0,0,1-.47l2.68-3.36a1.25,1.25,0,0,0,.27-.68L63,18.1,68,17l2.67,3.41a1.25,1.25,0,0,0,1.63.3l.4-.24,1.19,2.82a1.25,1.25,0,0,0,.73.69l4.58,1.63.08,3a1.25,1.25,0,0,0,1.25,1.21h.17l3.16-.44a1.25,1.25,0,0,0,.76-.41v1.68a1.25,1.25,0,0,0,.53,1l4.47,3.16a1.25,1.25,0,0,0,.67.23l5.23.2,3.35,3.94a1.25,1.25,0,0,0,.71.42l8.9,1.79-.07.84-1.59.88a1.25,1.25,0,0,0-.63.87l-1.94,10.5-4.54,1.42a1.25,1.25,0,0,0-.85,1.45l.5,2.43-5.07,4.2a1.25,1.25,0,0,0-.45,1l.09,1.49-2,3.61a1.25,1.25,0,0,0-.15.78L92,72.35a1.25,1.25,0,0,0,2.14.68l3.58-3.77.78.23,1.06,3.94-1.19.91a1.25,1.25,0,0,0-.3,1.66l3,4.67-.51.79-2.93.85a1.25,1.25,0,0,0-.63,2l3,3.76-1.16,1.29a1.25,1.25,0,0,0-.12,1.5l3.05,4.8a1.25,1.25,0,0,0,1.05.58,1.23,1.23,0,0,0,.4-.06l1.84-.61.3.73L104,98.35l-10.34,7.07-4.86-1.15-.73-1.62a1.25,1.25,0,0,0-.78-.69L77.34,99A1.23,1.23,0,0,0,77,99a1.25,1.25,0,0,0-.72.23L68,105.09a1.25,1.25,0,0,0-.52.88l-.33,2.95a1.25,1.25,0,0,0,.17.77l.87,1.46-7,1.54Z" fill={props.fill} />
          <path d="M67.49,18.35l2.18,2.79a2.5,2.5,0,0,0,2,1l.38,0,.7,1.66a2.5,2.5,0,0,0,1.46,1.38L78,26.46l0,1.32,0,.79A2.5,2.5,0,0,0,80.52,31l.34,0,2.5-.35a2.5,2.5,0,0,0,1.06,2l3,2.12,1.47,1a2.5,2.5,0,0,0,1.35.46l4.68.18,3,3.53a2.5,2.5,0,0,0,1.41.83l5.08,1,1.56.31a2.5,2.5,0,0,0-1,1.59l-1.8,9.76-1.9.6-1.92.6a2.5,2.5,0,0,0-1.7,2.89L98,59.23,93.5,62.95A2.5,2.5,0,0,0,92.6,65l.07,1.13-1.83,3.29A2.5,2.5,0,0,0,90.55,71l.22,1.53a2.5,2.5,0,0,0,4.29,1.37l2.6-2.74.48,1.8-.53.4A2.5,2.5,0,0,0,97,76.68l2.41,3.81-2.19.64A2.5,2.5,0,0,0,96,85.07L98.27,88l-.46.51a2.5,2.5,0,0,0-.25,3l3.05,4.8a2.5,2.5,0,0,0,2.11,1.16l.34,0h0l-9.67,6.6-3.73-.88-.48-1.06a2.5,2.5,0,0,0-1.57-1.37l-7.16-2.12-2.77-.82a2.5,2.5,0,0,0-2.16.36l-8.29,5.89a2.5,2.5,0,0,0-1,1.76l-.33,2.95a2.5,2.5,0,0,0,.32,1.53l-4.59,1-.72-.8-1.25-1.39a2.5,2.5,0,0,0-1.7-.82l-2.6-.17-3.2-2.56a2.5,2.5,0,0,0-3.39.24l-1,1.08-3.11.37-1.32-1.78a2.5,2.5,0,0,0-2.77-.89l-1,.33-5.15-4.61a2.5,2.5,0,0,0-.46-.33l1.43-1.61a2.5,2.5,0,0,0,.58-1.16L39.23,81l.55.25a2.5,2.5,0,0,0,3-3.75l-2.59-3.55.84-3.19a2.5,2.5,0,0,0-.55-2.3L39.08,66.8,34,61a2.5,2.5,0,0,0,.69-3.7L33,55.19l.31-1.48a2.5,2.5,0,0,0-1.82-2.93L27,49.63a2.5,2.5,0,0,0-2.83-1.5l-.46.1-1.67-2.37a2.5,2.5,0,0,0-2.48-1l-1,.18a2.5,2.5,0,0,0-.19-2.52l-1.15-1.67,1.26.07.72,1a2.5,2.5,0,0,0,3,.85L24,42a2.5,2.5,0,0,0,1.21-1.05l.69.06,2.83,3.1a2.5,2.5,0,0,0,3.5.19l1.09-1,3.39.16,2.58.12h.12a2.5,2.5,0,0,0,2.39-3.25l-1.23-3.91a2.5,2.5,0,0,0,2,.3l.73-.21,2.93,1.12a2.5,2.5,0,0,0,1.84,0l3.71-1.53a2.5,2.5,0,0,0,1.55-2.31V32.57l2.92-1.77h2.16a2.5,2.5,0,0,0,2-.94l1.19-1.5,1.48-1.86a2.5,2.5,0,0,0,.54-1.35l.13-1.59.37-4.45,3.33-.76m1-2.79-6.65,1.53-.52,6.27-.13,1.59L59.68,26.8l-1.19,1.5H55.63l-4.72,2.86v2.62L47.2,35.31l-3.71-1.42L42,34.33,40.11,30H36l3.49,11.13L36.88,41l-4.41-.21L30.62,42.4l-3.49-3.82-3.82-.33-.22,1.42-1.85.76-1.42-2-4-.22-1.64,2.51,2.18,3.16-1.42,1.31L17,47.85,20,47.31,22.66,51l2.07-.44.22,1.09,5.89,1.53-.55,2.62,2.4,3.05L30.08,60.4l7.14,8.06,1.45,1.64-1.15,4.34,3.29,4.51-1.09-.49-2.07-2.18L33.46,96.73l-4.25,4.8,3.49.65,6.22,5.56,2.4-.76,2.18,2.95,5.45-.65,1.64-1.75,3.82,3.05,3.38.22L59,112.19l1.69,1.88L70.11,112l-1.75-2.95.33-2.95L77,100.22l2.77.82,7.16,2.12,1,2.18,6,1.42,11-7.53,1.75-2.84-1-2.4-2.95,1-3.05-4.8,1.85-2.07-3.6-4.58,3.38-1,1.2-1.85-3.38-5.35L101,73.93,99.53,68.5l-2.18-.65-4.11,4.33L93,70.65l2.18-3.92-.11-1.85,5.65-4.68L100.09,57l1.92-.6,3.34-1,2.07-11.24,2.18-1.2.22-2.62-4.92-1-5.08-1L96.12,34l-5.78-.22-1.47-1-3-2.12V26.87l-1-.55-1.2,1.75-3.16.44,0-.79-.09-3L75,22.76l-1.75-4.15-1.64,1-3.16-4Z" fill="#fff" />
        </g>
        <polygon points="105.68 94 102.73 94.98 99.68 90.18 101.53 88.11 97.93 83.53 101.31 82.55 102.51 80.69 99.13 75.34 100.99 73.93 99.53 68.5 97.35 67.85 93.24 72.18 93.02 70.65 95.2 66.73 95.1 64.87 100.74 60.19 100.09 57.03 102.01 56.43 105.35 55.38 107.42 44.14 109.61 42.94 109.82 40.33 104.91 39.34 99.83 38.32 96.12 33.96 90.34 33.74 88.86 32.7 85.86 30.57 85.86 26.86 84.88 26.32 83.68 28.07 80.52 28.5 80.5 27.71 80.41 24.68 75.02 22.76 73.28 18.62 71.64 19.6 68.48 15.56 61.82 17.09 61.3 23.36 61.17 24.94 59.68 26.8 58.49 28.3 55.63 28.3 50.91 31.16 50.91 33.78 47.2 35.31 43.49 33.89 41.97 34.33 40.11 29.96 35.97 29.96 39.46 41.09 36.88 40.97 32.48 40.76 30.62 42.4 27.13 38.58 23.31 38.25 23.09 39.67 21.24 40.44 19.82 38.47 15.78 38.25 14.15 40.76 16.33 43.93 14.91 45.23 16.98 47.85 20.04 47.31 22.66 51.02 24.73 50.58 24.95 51.67 30.84 53.2 30.29 55.82 32.69 58.87 30.07 60.4 37.21 68.46 38.67 70.1 37.52 74.44 40.81 78.95 41.24 82.99 39.72 78.46 37.65 76.28 33.46 96.73 29.2 101.53 32.69 102.18 38.91 107.75 41.31 106.98 43.49 109.93 48.95 109.27 50.59 107.53 54.4 110.58 57.78 110.8 59.04 112.19 60.73 114.07 70.11 112 68.37 109.06 68.69 106.11 76.99 100.22 79.75 101.04 86.91 103.16 87.9 105.35 93.9 106.76 104.91 99.24 106.66 96.4 105.68 94" fill="none" stroke={props.fill} strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="114.15 111.17 113.23 101.97 112.26 101.88 112.35 105.21 110.25 105.21 106.22 108.19 106.39 114.74 108.5 116.22 107.97 117.36 110.61 119.54 111.72 119.54 112.99 116.9 112.65 113.79 114.15 111.17" fill={props.fill} />
      </g>
      <g>
        <g>
          <path d="M66.85,58.46a13,13,0,1,1,13-13A13,13,0,0,1,66.85,58.46Z" fill={props.fill} />
          <path d="M66.85,33.46a12,12,0,1,1-12,12,12,12,0,0,1,12-12m0-2a14,14,0,1,0,14,14,14,14,0,0,0-14-14Z" fill="#fff" />
        </g>
        <g>
          <circle cx="86.85" cy="84.46" r="6" fill={props.fill} />
          <path d="M86.85,79.46a5,5,0,1,1-5,5,5,5,0,0,1,5-5m0-2a7,7,0,1,0,7,7,7,7,0,0,0-7-7Z" fill="#fff" />
        </g>
        <g>
          <path d="M43.85,95.46a9,9,0,1,1,9-9A9,9,0,0,1,43.85,95.46Z" fill={props.fill} />
          <path d="M43.85,78.46a8,8,0,1,1-8,8,8,8,0,0,1,8-8m0-2a10,10,0,1,0,10,10,10,10,0,0,0-10-10Z" fill="#fff" />
        </g>
        <g>
          <circle cx="38.85" cy="57.46" r="8" fill={props.fill} />
          <path d="M38.85,50.46a7,7,0,1,1-7,7,7,7,0,0,1,7-7m0-2a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z" fill="#fff" />
        </g>
        <g>
          <circle cx="63.85" cy="69.46" r="5" fill={props.fill} />
          <path d="M63.85,65.46a4,4,0,1,1-4,4,4,4,0,0,1,4-4m0-2a6,6,0,1,0,6,6,6,6,0,0,0-6-6Z" fill="#fff" />
        </g>
        <g>
          <circle cx="59.85" cy="101.46" r="7" fill={props.fill} />
          <path d="M59.85,95.46a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-2a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z" fill="#fff" />
        </g>
        <g>
          <circle cx="17.85" cy="42.46" r="5" fill={props.fill} />
          <path d="M17.85,38.46a4,4,0,1,1-4,4,4,4,0,0,1,4-4m0-2a6,6,0,1,0,6,6,6,6,0,0,0-6-6Z" fill="#fff" />
        </g>
        <g>
          <circle cx="85.85" cy="102.46" r="4" fill={props.fill} />
          <path d="M85.85,99.46a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5,5,5,0,0,0-5-5Z" fill="#fff" />
        </g>
        <g>
          <circle cx="104.85" cy="49.46" r="7" fill={props.fill} />
          <path d="M104.85,43.46a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-2a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z" fill="#fff" />
        </g>
        <g>
          <circle cx="67.85" cy="17.46" r="6" fill={props.fill} />
          <path d="M67.85,12.46a5,5,0,1,1-5,5,5,5,0,0,1,5-5m0-2a7,7,0,1,0,7,7,7,7,0,0,0-7-7Z" fill="#fff" />
        </g>
        <circle cx="66.85" cy="45.46" r="14" fill="none" stroke={props.fill} strokeMiterlimit="10" />
        <circle cx="86.85" cy="84.46" r="7" fill="none" stroke={props.fill} strokeMiterlimit="10" />
        <circle cx="43.85" cy="86.46" r="10" fill="none" stroke={props.fill} strokeMiterlimit="10" />
        <circle cx="38.85" cy="57.46" r="9" fill="none" stroke={props.fill} strokeMiterlimit="10" />
        <circle cx="63.85" cy="69.46" r="6" fill="none" stroke={props.fill} strokeMiterlimit="10" />
        <circle cx="59.85" cy="101.46" r="8" fill="none" stroke={props.fill} strokeMiterlimit="10" />
        <circle cx="17.85" cy="42.46" r="6" fill="none" stroke={props.fill} strokeMiterlimit="10" />
        <circle cx="85.85" cy="102.46" r="5" fill="none" stroke={props.fill} strokeMiterlimit="10" />
        <circle cx="104.85" cy="49.46" r="8" fill="none" stroke={props.fill} strokeMiterlimit="10" />
        <circle cx="67.85" cy="17.46" r="7" fill="none" stroke={props.fill} strokeMiterlimit="10" />
      </g>
    </g>
  </svg>
);

export default SVG;

SVG.propTypes = {
  style: PropTypes.object,
  fill: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};

SVG.defaultProps = {
  style: {},
  fill: '#000',
  width: '100%',
  className: '',
};
