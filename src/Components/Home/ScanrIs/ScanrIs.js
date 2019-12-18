import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
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
        <div className="col-lg-8 py-1">
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
              <Icon className="fas fa-search-plus" aria-hidden />
              <Title><FormattedHTMLMessage id="Home.ScanrIs.section.second.title" /></Title>
              <DescriptiveText>
                <FormattedHTMLMessage id="Home.ScanrIs.section.second.text" />
              </DescriptiveText>
              <LearnMore href="/focus">
                <FormattedHTMLMessage id="Home.ScanrIs.learnMore.goToFocus" />
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
          </Grid>
        </div>
      </div>
    </div>
  </Section>
);
export default ScanrIs;
