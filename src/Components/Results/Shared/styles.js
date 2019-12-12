import styled from 'styled-components';
import styles from '../../../style.scss';

import OrangeBackground from '../../../images/img/poudre-orange_Fgris-BR.jpg';
import FuschiaBackground from '../../../images/img/poudre-fuschia_Fgris-B.jpg';
import GreenGreyBackground from '../../../images/img/poudre-vert_Fgris-A.jpg';
import GreenWhiteBackground from '../../../images/img/poudre-vert_Fblanc-A.jpg';

export const Section = styled.section`
  padding-top: 1.25em;
  padding-bottom: 1.25em;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
`;

export const SectionWhite = styled(Section)`
  background-color: white;
`;

export const SectionGrey = styled(Section)`
  background-color: ${styles.scanrlightgreyColor};
`;

export const SectionBlue = styled(Section)`
  background-color: ${styles.scanrblueColor};
`;

export const SectionEntity = styled(Section)`
  background-size: 50%;
  background-color: ${styles.scanrlightgreyColor};
  background-position: bottom 0 left 0;
`;

export const SectionProjects = styled(Section)`
  background-size: 50%;
  background-color: ${props => (props.alternative ? 'white' : styles.scanrlightgreyColor)};
  background-image: ${props => (props.alternative ? `url(${GreenWhiteBackground})` : `url(${GreenGreyBackground})`)};
  background-position: relative;
  background-position: bottom 0 right -15%;
`;

export const SectionProductions = styled(Section)`
  background-color: ${styles.scanrlightgreyColor};
  background-size: 20%;
  background-image: url(${FuschiaBackground});
  background-position: bottom 0 left 0;
`;

export const SectionPersons = styled(Section)`
  background-image: url(${OrangeBackground});
  background-size: 40%; /* version standardisée */
  background-color: ${styles.scanrlightgreyColor};
  background-position: bottom 0 right 0;
`;
