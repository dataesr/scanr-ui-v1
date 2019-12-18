import React from 'react';
import logoMinistere from '../../Shared/svg/logo-ministere.svg';
import {
  Grid,
  Title,
  DescriptiveText,
  Section,
  Separator,
  TitleLeft,
  LearnMore,
  Icon,
} from './styles';

const ScanrIs = () => (
  <Section>
    <div className="container py-3">
      <div className="row">
        <div className="col-lg-4 d-flex flex-column py-1">
          <TitleLeft>scanR, c&apos;est quoi ?</TitleLeft>
          <div className="d-flex">
            <Separator color="entity" />
            <Separator color="person" />
            <Separator color="projects" />
            <Separator color="production" />
          </div>
          <DescriptiveText>
            Moteur de recherche, scanR permet de rechercher dans 4 types d&apos;objets, les entitées et structures, les autheurs et chercheurs, les financements et projets et les productions au travers des thèses, des publications et des brevets.
          </DescriptiveText>
          <div className="mt-auto">
            <DescriptiveText>
              scanR est un service proposé par le Ministère de l&apos;enseignement supérieur, de la recherche et de l&apos;innovation
            </DescriptiveText>
            <img src={logoMinistere} height="60px" alt="" aria-hidden />
          </div>
        </div>
        <div className="col-lg-8 py-1">
          <Grid minWidth={300}>
            <div className="d-flex flex-column">
              <Icon className="fas fa-database" aria-hidden />
              <Title>Des données enrichies et reliées entre elles</Title>
              <DescriptiveText>
                scanR permet d&apos;effectuer une recherche sur différents types d&apos;objets, allant des structures de recherche aux projets de financements, en passant par les auteurs et leurs productions (publications, thèses et brevets).
                La mise en relation de tous ces objets permet d&apos;obtenir des résultats de recherche contextualisés et de les caractériser dans le paysage complexe du monde de la recherche et de l&apos;innovation.
              </DescriptiveText>
              <LearnMore href="/">Accèder à la recherche</LearnMore>
            </div>
            <div className="d-flex flex-column">
              <Icon className="fas fa-search-plus" aria-hidden />
              <Title>Des focus, pour approfondir des sujets précis</Title>
              <DescriptiveText>
                De nouveaux focus sont ajoutés régulièrement. Une contextualisation et des data-visualisations spécifiques sont réalisées. Pour chacun des focus, les données sous-jacentes sont disponibles, ou bien directement dans scanR, ou bien dans un jeu de données en open data.
              </DescriptiveText>
              <LearnMore href="/">Voir tous les focus</LearnMore>
            </div>
            <div className="d-flex flex-column">
              <Icon className="fas fa-chart-area" aria-hidden />
              <Title>Des outils pour tirer parti aux mieux des données proposées</Title>
              <DescriptiveText>
              scanR offre des possibilités de découverte, de visualisations et d&apos;exploitation massive
              Par exemple, pour chaque type d&apos;objet, scanR met en avant des objets similaires, en lien avec les mêmes thématiques de recherche
              De plus, des outils de visualisations sont disponibles à la fois sur chaque page de résultats de recherche comme sur les fiches de caractérisation des entités, projets, auteurs et publications.
              </DescriptiveText>
              <LearnMore href="/">En savoir plus</LearnMore>
            </div>
            <div className="d-flex flex-column">
              <Icon className="fas fa-lock-open" aria-hidden />
              <Title>Des données ouvertes et réutilisables</Title>
              <DescriptiveText>
                Les données utilisées par scanR sont en libre accès sous licence de réutilisation via des API et des jeux de données sont sur la plateforme Opendata du ministère de l&apos;enseignement supérieur, de la recherche et de l&apos;innovation
              </DescriptiveText>
              <LearnMore href="/">En savoir plus</LearnMore>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  </Section>
);
export default ScanrIs;
