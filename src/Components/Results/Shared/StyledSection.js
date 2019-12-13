import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import styles from '../../../style.scss';

// -------------------------------------
// Just a start rewrite section propelly.
// -------------------------------------
import YellowGreyBackground from '../../../images/img/poudre-jaune_Fgris-A.jpg';
import YellowWhiteBackground from '../../../images/img/poudre-jaune_Fblanc-A.jpg';
import OrangeGreyBackground from '../../../images/img/poudre-orange_Fgris-A.jpg';
import OrangeWhiteBackground from '../../../images/img/poudre-orange_Fblanc-A.jpg';
import FuschiaGreyBackground from '../../../images/img/poudre-fuschia_Fgris-A.jpg';
import FuschiaWhiteBackground from '../../../images/img/poudre-fuschia_Fblanc-A.jpg';
import GreenGreyBackground from '../../../images/img/poudre-vert_Fgris-A.jpg';
import GreenWhiteBackground from '../../../images/img/poudre-vert_Fblanc-A.jpg';

import BlueOrangeBackground from '../../../images/img/poudre-orange-Fbleu-BR.jpg';

const positions = {
  top: 'top',
  bottom: 'bottom',
  bottomleft: '-25% 100%',
  bottomright: '75% 100%',
  topleft: '10% -30%',
  topright: '10% -30%',
  left: '10% -30%',
  right: '10% -30%',
};

const object = {
  entity: {
    lightgrey: YellowGreyBackground,
    blue: null,
    deepblue: null,
    white: YellowWhiteBackground,
  },
  persons: {
    lightgrey: OrangeGreyBackground,
    blue: BlueOrangeBackground,
    deepblue: null,
    white: OrangeWhiteBackground,
  },
  productions: {
    lightgrey: FuschiaGreyBackground,
    blue: styles.scanrblueColor,
    deepblue: null,
    white: FuschiaWhiteBackground,
  },
  projects: {
    lightgrey: GreenGreyBackground,
    blue: styles.scanrblueColor,
    deepblue: null,
    white: GreenWhiteBackground,
  },
};

const colors = {
  lightgrey: styles.scanrlightgreyColor,
  blue: styles.scanrblueColor,
  deepblue: styles.scanrdeepblueColor,
  white: 'white',
};

const Section = styled.section`
  padding-top: 1.25em;
  padding-bottom: 1.25em;
  background-repeat: no-repeat;
  background-attachment: relative;
  -webkit-background-size: cover;
  background-color: ${props => props.theme.backgroundColor};
  background-size: 50%;
  background-position: ${props => props.theme.imagePosition};
  background-image: url(${props => props.theme.backgroundImage});
`;

const StyledSection = (props) => {
  const themes = {};
  if (props.position) {
    themes.imagePosition = positions[props.position];
  }
  if (props.color) {
    themes.backgroundColor = colors[props.color];
  }
  if (props.object) {
    themes.backgroundImage = object[props.object][props.color];
  }

  return (
    <ThemeProvider theme={themes}>
      <Section>
        {props.children}
      </Section>
    </ThemeProvider>
  );
};

export default StyledSection;

StyledSection.propTypes = {
  position: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  object: PropTypes.string.isRequired,
  children: PropTypes.node,
};
