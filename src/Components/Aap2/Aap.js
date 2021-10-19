/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import {
  Container, Row, Col, Form, Button,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

// ScanR components
import Header from './Header';
import EntityCard from '../Search/Results/ResultCards/EntityCard';
import LeafletMap from '../Shared/GraphComponents/Graphs/LeafletMap';
// import { API_STRUCTURES_SEARCH_END_POINT } from '../../config/config';
import getSelectedKey from '../../Utils/getSelectKey';

// Styles
import classes from './custom.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Traductions
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import responseFromScanR from './stopper.json';

const msg = { fr: messagesFr, en: messagesEn };
// const pageSize = 50;
const entitiesPerPage = 20;

const AapPage = (props) => {
  const [callObject, setCallObject] = useState({}); // getDataFromCE
  const [keywords, setKeywords] = useState([]); // getDataFromCE
  const [dataFromScanR, setResponsesFromScanR] = useState([]);

  const getData = async () => {
    try {
      const responseCallFromCE = await Axios.get(`https://curie.staging.dataesr.ovh/api/ec-topics/${props.match.params.id.toLowerCase()}`);
      setCallObject(responseCallFromCE.data);
      setKeywords(responseCallFromCE.data.keywords);
      // const url = 'https://scanr-api.enseignementsup-recherche.gouv.fr/elasticsearch/structures/_search';
      // const query = {
      //   query: {
      //     bool: {
      //       should: [
      //         { match_phrase: { 'publications.publication.title.default': 'Internet of Things' } },
      //         { match_phrase: { 'publications.publication.title.default': 'robotics' } },
      //         { match_phrase: { 'publications.publication.title.default': 'Healthy ageing' } },
      //         { match_phrase: { 'publications.publication.keywords.default': 'Internet of Things' } },
      //         { match_phrase: { 'publications.publication.keywords.default': 'robotics' } },
      //         { match_phrase: { 'publications.publication.keywords.default': 'Healthy ageing' } },
      //         { match_phrase: { 'projects.project.label.en': 'Internet of Things' } },
      //         { match_phrase: { 'projects.project.label.en': 'robotics' } },
      //         { match_phrase: { 'projects.project.label.en': 'Healthy ageing' } },
      //         { match_phrase: { 'projects.project.label.default': 'Internet of Things' } },
      //         { match_phrase: { 'projects.project.label.default': 'robotics' } },
      //         { match_phrase: { 'projects.project.label.default': 'Healthy ageing' } },
      //         { match_phrase: { 'websites.webPages.content': 'Internet of Things' } },
      //         { match_phrase: { 'websites.webPages.content': 'robotics' } },
      //         { match_phrase: { 'websites.webPages.content': 'Healthy ageing' } },
      //       ],
      //       filter: [
      //         { match: { status: 'active' } },
      //       ],
      //     },
      //   },
      //   highlight: {
      //     fields: {
      //       'publications.publication.title.default': {},
      //       'publications.publication.keywords.default': {},
      //       'projects.project.label.en': {},
      //       'projects.project.label.default': {},
      //       'websites.webPages.content': {},
      //     },
      //   },
      //   _source: false,
      //   fields: [
      //     'id',
      //     'label.default',
      //     'isFrench',
      //     'kind',
      //     'address.localisationSuggestions',
      //     'projects.project.type',
      //     'address.gps',
      //     'address.*',
      //   ],
      // };
      // const responseFromScanRTest = await Axios.post(url, query);
      // console.log('responseFromScanRTest', responseFromScanRTest);
      setResponsesFromScanR(responseFromScanR); // Bouchon
    } catch (err) {
      throw (err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getFilters = () => (
    <Col md="4">
      menu
    </Col>
  );

  const getContent = () => {
    // const data = [];
    const data = dataFromScanR?.hits?.hits?.map((structure) => {
      console.log(structure);
      const addressMainIndex = (structure.fields['address.main'].indexOf('true') === -1) ? 0 : structure.fields['address.main'].indexOf('main');
      const address = (structure.fields['address.address']) || '';
      const city = (structure.fields['address.city']) || '';
      const postcode = (structure.fields['address.postcode']) || '';
      const country = (structure.fields['address.country']) || '';
      const urbanUnitCode = (structure.fields['address.urbanUnitCode']) || '';
      const urbanUnitLabel = (structure.fields['address.urbanUnitLabel']) || '';
      const kind = (structure.fields['address.kind']) || '';
      const addressScore = (structure.fields['address._score']) || '';

      return {
        address: [{
          address: address[addressMainIndex] || '',
          city: city[addressMainIndex] || '',
          postcode: postcode[addressMainIndex] || '',
          country: country[addressMainIndex] || '',
          gps: {
            lat: structure.fields['address.gps'][addressMainIndex]?.coordinates[0],
            lon: structure.fields['address.gps'][addressMainIndex]?.coordinates[1],
          },
          main: true,
          provider: 'adresse.data.gouv.fr',
          score: addressScore,
          urbanUnitCode: urbanUnitCode[addressMainIndex] || '',
          urbanUnitLabel: urbanUnitLabel[addressMainIndex] || '',
        }],
        id: structure.fields.id[0],
        isFrench: structure.fields.isFrench[0],
        kind,
        label: { default: structure.fields['label.default'][0] },
        highlights: structure.highlight,
      };
    });

    console.log(data);
    return (
      <>
        <Col>
          <div className={classes.callBlock}>
            {
              (callObject.title) ? (
                <h2 className={classes.callTitle}>
                  {`${callObject.title} - ${callObject.identifier}`}
                </h2>
              ) : null
            }
            {
              (callObject.callTitle) ? (
                <p className={classes.subTitle}>
                  {`${callObject.callTitle} - ${callObject.callIdentifier}`}
                </p>
              ) : null
            }

          </div>
          {
            data.map(s => (
              <div key={s.id}>
                <EntityCard
                  data={s}
                  language={props.language}
                  highlights={[s.highlights]}
                  target="_blank"
                />
              </div>
            ))
          }
        </Col>
      </>
    );
  };

  console.log(keywords);

  return (
    <IntlProvider locale={props.language} messages={msg[props.language]}>
      <div className={classes.aap}>
        <Header title={<FormattedHTMLMessage id="title" />} />
        <Container as="main">
          <Row>
            {
              getFilters()
            }
            {
              (dataFromScanR?.hits?.hits?.length > 0) ? getContent() : 'en cours ...'}
          </Row>
        </Container>
      </div>
    </IntlProvider>
  );
};

export default AapPage;

AapPage.propTypes = {
  match: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
