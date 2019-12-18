import React from 'react';
import styled from 'styled-components';
import searchImage from '../../../images/img/search.png';
import entityImage from '../../../images/img/entityPage.png';
import ecosystemImage from '../../../images/img/ecosystem.png';
import focusImage from '../../../images/img/focus.png';
import styles from '../../../style.scss';
import logoMinistere from '../../Shared/svg/logo-ministere.svg';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => `${(props.minWidth)}px`}, 1fr));
  grid-gap: 32px;
`;

export const Button = styled.button`
  margin: auto;
  display: flex;
  padding: 0.5em;
  height: 2.3rem;
  align-items: center;
  background-color: ${styles.scanrblueColor};
  border-radius: 8px;
  &:hover {
    background-color: ${styles.scanrgreyColor}
  }
  > p {
    color: white;
    margin: 0;
  }
  > i {
    color: white;
    font-size: 1.2em;
    margin-left: 16px;
  }
`;

export const Title = styled.h2`
  color: ${styles.scanrdeepblueColor}
  font-size: 1.3rem;
  padding-bottom: 0.75em;
  font-weight: bold;
  margin: 0;
`;

export const DescriptiveText = styled.p`
  color: ${styles.scanrgreyColor}
  font-size: 0.9rem;
  padding-bottom: 0.5em;
  margin: 0;
`;

export const Section = styled.div`
  background-color: aliceblue;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
`;

export const Separator = styled.div`
  background-color: ${props => (props.color ? styles[`${props.color}Color`] : styles.scanrelectricblueColor)};
  height: 3px;
  margin-left: 0;
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  width: 15%;
`;

export const TitleLeft = styled(Title)`
  font-size: 1.8rem;
  padding: 0;
`;

export const Icon = styled.i`
  color: ${styles.scanrelectricblueColor}
  font-size: 2.5rem;
  padding-bottom: 0.5em;
`;

const style = { borderRadius: '16px' }
const ScanrIs = () => (
  <Section>
    <div className="container py-5">
      <div className="row">
        <div className="col-4 d-flex flex-column">
          <TitleLeft>scanR, c&apos;est quoi ?</TitleLeft>
          <div className="d-flex">
            <Separator color="entity"/>
            <Separator color="person"/>
            <Separator color="projects"/>
            <Separator color="production"/>
          </div>
          <DescriptiveText>
            Moteur de recherche, scanR permet de rechercher dans 4 types d&apos;objets, les entitées et structures, les autheurs et chercheurs, les financements et projets et les productions au travers des thèses, des publications et des brevets.
          </DescriptiveText>
          <div className="mt-auto">
            <DescriptiveText>
              scanR est un service proposé par le Ministère de l&apos;enseignement supérieur, de la recherche et de l&apos;innovation
            </DescriptiveText>
            <img src={logoMinistere} height="60px"/>
          </div>
        </div>
        <div className="col-8">
          <Grid minWidth={300}>
          <div className="d-flex flex-column">
            <Icon className="fas fa-folder" />
            <Title>Explorer des données enrichies et reliées entre elles...</Title>
            <DescriptiveText>
              scanR permet d&apos;effectuer une recherche sur différents types d&apos;objets, allant des structures de recherche aux projets de financements, en passant par les auteurs et leurs productions (publications, thèses et brevets).
              La mise en relation de tous ces objets permet d&apos;obtenir des résultats de recherche contextualisés et de les caractériser dans le paysage complexe du monde de la recherche et de l&apos;innovation.
            </DescriptiveText>
          </div>
          <div className="d-flex flex-column">
            <Icon className="fas fa-folder" />
            <Title>Des focus, pour approfondir des sujets précis</Title>
            <DescriptiveText>
              De nouveaux focus sont ajoutés régulièrement. Une contextualisation et des data-visualisations spécifiques sont réalisées. Pour chacun des focus, les données sous-jacentes sont disponibles, ou bien directement dans scanR, ou bien dans un jeu de données en open data.
            </DescriptiveText>
          </div>
          <div className="d-flex flex-column">
            <Icon className="fas fa-folder" />
            <Title>Des outils pour tirer parti aux mieux des données proposées</Title>
            <DescriptiveText>
            scanR offre des possibilités de découverte, de visualisations et d&apos;exploitation massive
            Par exemple, pour chaque type d&apos;objet, scanR met en avant des objets similaires, en lien avec les mêmes thématiques de recherche
            De plus, des outils de visualisations sont disponibles à la fois sur chaque page de résultats de recherche comme sur les fiches de caractérisation des entités, projets, auteurs et publications.
            </DescriptiveText>
          </div>
          <div className="d-flex flex-column">
            <Icon className="fas fa-folder" />
            <Title>Des données ouvertes et réutilisables</Title>
            <DescriptiveText>
              Les données utilisées par scanR sont en libre accès sous licence de réutilisation via des API et des jeux de données sont sur la plateforme Opendata du ministère de l&apos;enseignement supérieur, de la recherche et de l&apos;innovation
            </DescriptiveText>
          </div>
          </Grid>
        </div>
      </div>
    </div>
  </Section>
);
export default ScanrIs;
