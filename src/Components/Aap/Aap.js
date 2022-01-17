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
import EntityCard from './EntityCard';
import LeafletMap from '../Shared/GraphComponents/Graphs/LeafletMap';
import { API_ES, API_KEY_ES } from '../../config/config';

import getSelectedKey from '../../Utils/getSelectKey';

// Styles
import classes from './custom.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Traductions
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

// exemple .../dt-tds-01-2019

const msg = { fr: messagesFr, en: messagesEn };
// const pageSize = 50;
const entitiesPerPage = 20;

const AapPage = (props) => {
  const [callObject, setCallObject] = useState({});
  const [keywords, setKeywords] = useState([]);
  const [dataFromScanR, setResponsesFromScanR] = useState([]);
  const [isFrenchOnly, setIsFrenchFilter] = useState(true);
  const [filters, setFilters] = useState([]);

  const [selectedLocalisations, setSelectedLocalisations] = useState([]);

  const getMatchPhrases = (kwords) => {
    const ret = [];
    kwords.forEach((keyword) => {
      ret.push({ match_phrase: { 'publications.publication.title.default': keyword } });
      ret.push({ match_phrase: { 'publications.publication.keywords.default': keyword } });
      ret.push({ match_phrase: { 'projects.project.label.en': keyword } });
      ret.push({ match_phrase: { 'projects.project.label.default': keyword } });
      ret.push({ match_phrase: { 'websites.webPages.content': keyword } });
    });
    return ret;
  };

  const getDynamicFilters = () => {
    const ret = [];
    ret.push({ match: { status: 'active' } });
    filters.forEach((filter) => {
      ret.push({ match: { [filter.key]: filter.value } });
    });
    return ret;
  };

  const getDataFromCeAPI = async () => {
    const responseCallFromCE = await Axios.get(`https://api.curiexplore.staging.dataesr.ovh/ec-topics/${props.match.params.id.toLowerCase()}`);
    return responseCallFromCE.data;
  };

  const getScanRData = async (kwords) => {
    const query = {
      query: {
        bool: {
          should: getMatchPhrases(kwords),
          filter: getDynamicFilters(),
        },
      },
      aggs: {
        byAddress: {
          terms: {
            field: 'address.localisationSuggestions.keyword',
            size: 10000,
          },
        },
        byKind: {
          terms: { field: 'kind.keyword' },
        },
        byProjectType: {
          terms: { field: 'projects.project.type.keyword' },
        },
      },
      highlight: {
        fields: {
          'publications.publication.title.default': {},
          'publications.publication.keywords.default': {},
          'projects.project.label.en': {},
          'projects.project.label.default': {},
          'websites.webPages.content': {},
        },
      },
      _source: false,
      fields: [
        'id',
        'label.default',
        'isFrench',
        'kind',
        'address.main',
        'address.address',
        'address.city',
        'address.postcode',
        'address.country',
        'address.urbanUnitCode',
        'address.urbanUnitLabel',
        'address.kind',
        'address._score',
        'projects.project.type',
        'address.localisationSuggestions',
        'address.gps',
        // 'address.*',
      ],
    };
    if (isFrenchOnly) {
      query.query.bool.filter.push({ term: { isFrench: isFrenchOnly } });
    }
    const responseFromScanR = await Axios.post(API_ES, query, {
      headers: {
        Authorization: API_KEY_ES,
      },
    });
    return responseFromScanR;
  };

  const getInitialData = async () => {
    try {
      const dataFromCeAPI = await getDataFromCeAPI();
      const dataScanRAPI = await getScanRData(dataFromCeAPI.keywords);
      setCallObject(dataFromCeAPI);
      setKeywords(dataFromCeAPI.keywords);
      setResponsesFromScanR(dataScanRAPI);
    } catch (err) {
      throw (err);
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const updateData = async () => {
    try {
      const dataScanRAPI = await getScanRData(keywords);
      setResponsesFromScanR(dataScanRAPI);
    } catch (err) {
      throw (err);
    }
  };

  const addKeyword = () => {
    setKeywords(oldArray => [...oldArray, document.getElementById('keyword').value]);
  };

  const deleteKeyword = (kwToDelete) => {
    setKeywords(keywords.filter(k => (k !== kwToDelete)));
  };

  const checkWarning = () => {
    if (keywords.length !== callObject?.keywords?.length) {
      return false;
    }
    let checker = true;
    keywords.forEach((k) => {
      if (!callObject.keywords.includes(k)) {
        checker = false;
      }
    });

    const flagReload = false;
    return checker || flagReload;
  };

  const onIsFrenchChange = (e) => {
    setIsFrenchFilter(e.target.checked);
  };

  const updateFilters = (key, value) => {
    if (!filters.find(s => (s.key === key && s.value === value))) {
      const newArr = [...filters];
      newArr.push({
        key,
        value,
      });
      setFilters(newArr);
    } else {
      const newArr = filters.filter(s => (s.value !== value));
      setFilters(newArr);
    }
  };

  const getAPIFilters = () => {
    const aggregations = (dataFromScanR && dataFromScanR.data && dataFromScanR.data.aggregations)
      ? dataFromScanR.data.aggregations : null;

    // const localisations = aggregations?.byAdress?.buckets?.map(el => (el.key));

    const localisationSet = new Set();
    if (aggregations?.byAdress?.buckets) {
      aggregations.byAdress.buckets.forEach((loc) => {
        localisationSet.add(loc.key);
      });
    }


    return (
      <Col md={4} className={classes.AsideContainer}>
        <p className={classes.title}>
          <FormattedHTMLMessage id="filterBy" />
        </p>
        <hr className={classes.separator} />
        <p className={classes.subTitle}>
          <FormattedHTMLMessage id="keywords" />
        </p>
        <input
          type="text"
          id="keyword"
          className={classes.SearchBar}
        />
        <Button
          className={`btn ml-1 ${classes.btn_dark} ${classes.btn_dark_margin54} ${classes.BtnSearch}`}
          onClick={() => addKeyword()}
        >
          <i className="fas fa-plus" />
        </Button>
        <ul className={classes.Keywords}>
          {
            keywords.map(kw => (
              <li key={kw}>
                <span
                  onClick={() => {}}
                  onKeyPress={() => {}}
                  tabIndex={0}
                  role="button"
                >
                  {kw}
                </span>
                <span
                  onClick={() => deleteKeyword(kw)}
                  onKeyPress={() => deleteKeyword(kw)}
                  tabIndex={0}
                  role="button"
                >
                  <i className="fas fa-times" />
                </span>
              </li>
            ))
          }
        </ul>

        <hr />
        {/* isFrench */}
        <Form.Group>
          <Form.Check
            type="checkbox"
            id="isFrenchOnly"
            label="Entités françaises uniquement"
            checked={isFrenchOnly}
            onChange={e => onIsFrenchChange(e)}
          />
        </Form.Group>

        {/* Par secteurs */}
        <p className={classes.subTitle}>
          <FormattedHTMLMessage id="sectors" />
        </p>
        {
          (aggregations?.byKind?.buckets)
            ? aggregations.byKind.buckets.map((sector, i) => (
              <Form.Check
                key={sector.key}
                type="checkbox"
                id={`isSector${i}`}
                label={sector.key}
                onChange={() => updateFilters('kind', sector.key)}
              />
            ))
            : null
        }

        {/* Par type de financements */}
        <p className={`mt-3 ${classes.subTitle}`}>
          <FormattedHTMLMessage id="typeFunding" />
        </p>
        {
          (aggregations?.byProjectType?.buckets)
            ? aggregations.byProjectType.buckets.map((tf, i) => (
              <Form.Check
                key={tf.key}
                type="checkbox"
                id={`istf${i}`}
                label={tf.key}
                onChange={() => updateFilters('projects.project.type', tf.key)}
              />
            ))
            : null
        }

        {/* Par localisation - géo
        <p className={`mt-3 ${classes.subTitle}`}>
          Localisations
        </p>
        <Typeahead
          multiple
          onChange={e => setSelectedLocalisations(e)}
          options={localisationSet}
          selected={selectedLocalisations}
        /> */}

        <hr className={classes.separator} />
        <div className="text-center">
          <Button
            className={`btn ml-1 ${classes.btn_dark} ${classes.btn_dark_margin54} ${classes.BtnSearch}`}
            onClick={() => updateData()}
          >
            <FormattedHTMLMessage id="button" />
            <i className="fas fa-search ml-3" />
          </Button>
        </div>
      </Col>
    );
  };

  const getContent = () => {
    const data = dataFromScanR?.data?.hits?.hits?.map((structure) => {
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
            lat: structure.fields['address.gps'][addressMainIndex]?.coordinates[1],
            lon: structure.fields['address.gps'][addressMainIndex]?.coordinates[0],
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

    const dataMap = [];
    data.forEach((s) => {
      if (s.address && s.address[0]?.gps) {
        dataMap.push(
          {
            id: s.id,
            infos: [getSelectedKey(s, 'label', props.language, 'default')],
            position: [s.address[0].gps.lat, s.address[0].gps.lon],
          },
        );
      }
    });

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
            (!checkWarning())
              ? (
                <div className={`my-2 p-2 ${classes.MessagesBox}`}>
                  {
                    (!checkWarning()) ? (
                      <>
                        <i className="fas fa-exclamation-triangle mr-2" />
                        <FormattedHTMLMessage id="warning" />
                      </>
                    ) : null
                  }
                </div>
              ) : null
          }
          <p className="my-2">
            <LeafletMap
              filename="Carte"
              data={dataMap}
              language={props.language}
            />
          </p>
          {
            data.map(s => (
              <div key={s.id}>
                <EntityCard
                  data={s}
                  language={props.language}
                  highlights={s.highlights}
                  target="_blank"
                />
              </div>
            ))
          }
        </Col>
      </>
    );
  };

  return (
    <IntlProvider locale={props.language} messages={msg[props.language]}>
      <div className={classes.aap}>
        <Header title={<FormattedHTMLMessage id="title" />} />
        <Container as="main">
          <Row>
            {getAPIFilters()}
            {(dataFromScanR?.data?.hits?.hits?.length > 0) ? getContent() : 'en cours ...'}
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
