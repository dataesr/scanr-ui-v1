import React, { useContext } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import { GlobalContext } from '../../../GlobalContext';
import logoMinistere from '../../Shared/svg/logo-ministere.svg';
import FocusCard from '../../Shared/Ui/FocusMiniCard/FocusMiniCard';
// import LexiconModal from '../../Shared/Lexicon/LexiconModal/LexiconModal';
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

import classes from './ScanrIs.scss';

const focusList = [
  {
    tags: {
      fr: [],
      en: [],
    },
    title: {
      fr: 'Chaînes Youtube dans scanR',
      en: 'Youtube channels in scanR',
    },
    type: 'youtube',
    url: '/focus/youtube',
    api: 'persons',
  },
  {
    tags: {
      fr: [],
      en: [],
    },
    title: {
      fr: 'SATT dans scanR',
      en: 'French SATT in scanR',
    },
    type: 'map',
    url: '/focus/carte-satt-2019',
    api: 'structures',
  },
  {
    tags: {
      fr: [],
      en: [],
    },
    title: {
      fr: 'Productions avec un lien Software Heritage dans scanR',
      en: 'Productions with a link to Software Heritage in scanR',
    },
    type: 'software-heritage',
    url: '/focus/software_heritage',
    api: 'publications',
  },
  {
    tags: {
      fr: [],
      en: [],
    },
    title: {
      fr: 'Nominations IUF 2019',
      en: 'IUF new members in 2019',
    },
    type: 'treemap',
    url: '/focus/iuf',
    api: 'persons',
  },
  {
    tags: {
      fr: [],
      en: [],
    },
    title: {
      fr: 'Thèmes des thèses soutenues en 2018',
      en: 'Thematics of the thesis defended in 2018',
    },
    type: 'bubble',
    url: '/focus/themes-theses-2018',
    api: 'publications',
  },
];


const ScanrIs = () => {
  const language = useContext(GlobalContext).language;
  return (
    <Section>
      <div className={` ${classes.Container} py-4`}>
        <div className="row">
          <div className="col-lg-3 d-flex flex-column py-1">
            <TitleLeft><FormattedHTMLMessage id="Home.ScanrIs.main.title" /></TitleLeft>
            <div className="d-flex">
              <Separator color="entity" />
              <Separator color="person" />
              <Separator color="projects" />
              <Separator color="production" />
            </div>
            <DescriptiveText>
              <FormattedHTMLMessage id="Home.ScanrIs.main.text" />
            </DescriptiveText>
            <div className="mt-auto">
              <DescriptiveText>
                <FormattedHTMLMessage id="Home.ScanrIs.main.ministry" />
              </DescriptiveText>
              <img src={logoMinistere} height="60px" alt="" aria-hidden />
            </div>
          </div>
          <div className="col-lg-6 py-1">
            <Grid minWidth={300}>
              <div className="d-flex flex-column">
                <Icon className="fas fa-database" aria-hidden />
                <Title><FormattedHTMLMessage id="Home.ScanrIs.section.first.title" /></Title>
                <DescriptiveText>
                  <FormattedHTMLMessage id="Home.ScanrIs.section.first.text" />
                </DescriptiveText>
                <LearnMore href="/recherche/all">
                  <FormattedHTMLMessage id="Home.ScanrIs.learnMore.goToSearch" />
                </LearnMore>
              </div>
              <div className="d-flex flex-column">
                <Icon className="fas fa-chart-area" aria-hidden />
                <Title><FormattedHTMLMessage id="Home.ScanrIs.section.third.title" /></Title>
                <DescriptiveText>
                  <FormattedHTMLMessage id="Home.ScanrIs.section.third.text" />
                </DescriptiveText>
                <LearnMore href="/tutorial">
                  <FormattedHTMLMessage id="Home.ScanrIs.learnMore.howtoScanr" />
                </LearnMore>
              </div>
              <div className="d-flex flex-column">
                <Icon className="fas fa-lock-open" aria-hidden />
                <Title><FormattedHTMLMessage id="Home.ScanrIs.section.forth.title" /></Title>
                <DescriptiveText>
                  <FormattedHTMLMessage id="Home.ScanrIs.section.forth.text" />
                </DescriptiveText>
                <LearnMore href="/opendata">
                  <FormattedHTMLMessage id="Home.ScanrIs.learnMore.learn" />
                </LearnMore>
              </div>
              <div className="d-flex flex-column">
                <Icon className="far fa-envelope-open" aria-hidden />
                <Title><FormattedHTMLMessage id="Home.ScanrIs.section.fifth.title" /></Title>
                <DescriptiveText>
                  <FormattedHTMLMessage id="Home.ScanrIs.section.fifth.text" />
                </DescriptiveText>
                <LearnMore href="/contact">
                  <FormattedHTMLMessage id="Home.ScanrIs.learnMore.contact" />
                </LearnMore>
              </div>
            </Grid>
          </div>
          <div className={`col-lg-3 py-1 ${classes.FocusBox}`}>
            <div className="d-flex flex-column">
              <div className={classes.cardHeader}>
                { /* <Icon className="fas fa-search-plus" aria-hidden /> */ }
                <Title>
                  <FormattedHTMLMessage id="Home.ScanrIs.section.second.title" />
                </Title>
              </div>
              <DescriptiveText>
                <FormattedHTMLMessage id="Home.ScanrIs.section.second.text" />
              </DescriptiveText>
              <hr />
              {
                focusList.map(oneFocus => (
                  <div key={oneFocus.title} className="my-1">
                    <FocusCard
                      schema={oneFocus.api}
                      tags={oneFocus.tags[language]}
                      title={oneFocus.title[language]}
                      type={oneFocus.type}
                      url={oneFocus.url}
                    />
                  </div>
                ))
              }
              <br />
              <LearnMore href="/focus">
                <FormattedHTMLMessage id="Home.ScanrIs.learnMore.goToFocus" />
              </LearnMore>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
export default ScanrIs;
