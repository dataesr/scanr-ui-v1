import styled from 'styled-components';
import styles from '../../../style.scss';

// -------------------------------------
// Just a start rewrite section propelly.
// -------------------------------------
export const Section = styled.section`
  padding-top: 1.25em;
  padding-bottom: 1.25em;
  background-repeat: no-repeat;
  background-attachment: relative;
  -webkit-background-size: cover;
`;

export const SectionWhite = styled(Section)`
  background-color: white;
`;

export const SectionGrey = styled(Section)`
  background-color: ${props => (props.dark ? styles.scanrgreyColor : styles.scanrlightgreyColor)};
`;

export const SectionBlue = styled(Section)`
  background-color: ${styles.scanrblueColor};
`;

export const SectionEntity = styled(Section)`
  -webkit-background-size: cover; /* pour anciens Chrome et Safari */
  background-size: 50%; /* version standardisée */
  background-color: ${styles.scanrlightgreyColor};
  background-position: bottom 0 left 0;
  background-image: url('./img/poudres/poudre-jaune_Fgris-B.jpg');
`;

export const SectionProjects = styled(Section)`
  background-size: 50%;
  background-color: ${props => (props.alternative ? 'white' : styles.scanrlightgreyColor)};
  background-image: ${props => (props.alternative ? 'url(\'./img/poudres/poudre-vert_Fblanc-A.jpg\')' : 'url(\'./img/poudres/poudre-vert_Fgris-A.jpg\')')};
  background-position: bottom 0 right -15%;
`;

export const SectionProductions = styled(Section)`
  background-color: ${styles.scanrlightgreyColor};
  background-size: 20%;
  background-image: url('./img/poudres/poudre-fuschia_Fgris-B.jpg');
  background-position: bottom 0 left 0;
`;

export const SectionPersons = styled(Section)`
  background-image: url('./img/poudres/poudre-orange_Fgris-BR.jpg');
  background-size: 40%;
  background-color: ${styles.scanrlightgreyColor};
  background-position: bottom 0 right 0;
`;

export const SectionPersonsBlue = styled(SectionPersons)`
  background-image: url('./img/poudres/poudre-orange-Fbleu-BR.jpg');
  background-size: 30%;
  background-color: ${styles.scanrblueColor};
`;
