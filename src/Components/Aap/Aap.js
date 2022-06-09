/* eslint-disable no-console */
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
import Autocomplete from '../Search/Filters/ObjectsFilters/Filters/Autocomplete';
import Loader from '../Shared/LoadingSpinners/RouterSpinner';

import getSelectedKey from '../../Utils/getSelectKey';

// Styles
import classes from './custom.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Traductions
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

// exemple .../dt-tds-01-2019

const msg = { fr: messagesFr, en: messagesEn };

const AapPage = (props) => {
  const [callObject, setCallObject] = useState({});
  const [keywords, setKeywords] = useState([]);
  const [dataFromScanR, setResponsesFromScanR] = useState([]);
  const [radioFrench, setRadioFrench] = useState('isFrench');
  const [filters, setFilters] = useState([]);
  const [warning, setWarning] = useState(false);
  const [idNotFound, setIdNotFound] = useState(false);
  const [selectedLocalisations, setSelectedLocalisations] = useState('');
  const [loading, setLoading] = useState(true);

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

  const getDynamicFilters = (localisationFilter = null) => {
    const ret = [];
    ret.push({ match_phrase: { status: 'active' } });
    filters.forEach((filter) => {
      ret.push({ match_phrase: { [filter.key]: filter.value } });
    });
    if (localisationFilter) {
      ret.push({ match_phrase: { 'address.localisationSuggestions': localisationFilter } });
    } else if (filters.find(el => el.key === 'address.localisationSuggestions')) {
      return ret.filter(el => !('address.localisationSuggestions' in el.match_phrase));
    }

    return ret;
  };

  const getDataFromCeAPI = async () => {
    // const responseCallFromCE = await Axios.get(`https://curiexplore-api.staging.dataesr.ovh/ec-topics/${props.match.params.id.toLowerCase()}`);
    const url = `https://scanr.staging.dataesr.ovh/topics/${props.match.params.id.toLowerCase()}`;
    const responseCallFromCE = await Axios.get(url);
    return responseCallFromCE.data.TopicDetails;
  };

  const getScanRData = async (kwords, localisationFilter) => {
    setLoading(true);
    const query = {
      query: {
        bool: {
          should: getMatchPhrases(kwords),
          minimum_should_match: 1,
          filter: getDynamicFilters(localisationFilter),
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
      size: 50,
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

    if (radioFrench === 'isFrench') {
      query.query.bool.filter.push({ term: { isFrench: true } });
    }
    if (radioFrench === 'notIsFrench') {
      query.query.bool.filter.push({ term: { isFrench: false } });
    }

    // const responseFromScanR = await Axios.post(API_ES, query, {
    const responseFromScanR = await Axios.post('https://scanr.coexya.eu/elasticsearch/structures/_search', query, {
      headers: {
        Authorization: API_KEY_ES,
      },
    }).catch((e) => { console.log('erreur API scanR: ', e); });
    setLoading(false);
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
      if (err?.response?.status === 404) {
        setIdNotFound(true);
      }
      throw (err);
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const updateData = async (localisationFilter = null) => {
    try {
      const dataScanRAPI = await getScanRData(keywords, localisationFilter);
      setResponsesFromScanR(dataScanRAPI);
      setWarning(false);
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

  const updateFilters = (key, value) => {
    if (!filters.find(s => (s.key === key && s.value === value))) {
      const newArr = [...filters];
      newArr.push({
        key,
        value,
      });
      setFilters(newArr);
    } else {
      setFilters(filters.filter(s => (s.value !== value)));
    }
    setWarning(true);
  };

  const getAPIFilters = () => {
    const aggregations = (dataFromScanR && dataFromScanR.data && dataFromScanR.data.aggregations)
      ? dataFromScanR.data.aggregations : null;

    const localisationSet = new Set();
    if (aggregations?.byAdress?.buckets) {
      aggregations.byAdress.buckets.forEach((loc) => {
        localisationSet.add(loc.key);
      });
    }

    const geoFacet = {};
    geoFacet.entries = dataFromScanR?.data?.aggregations?.byAddress?.buckets.map(el => ({ count: el.doc_count, value: el.key })) || [];
    geoFacet.id = 'localisations';

    const localisationHandler = (facetID, value) => {
      setSelectedLocalisations(value);
      updateFilters(facetID, value);
      updateData(value);
    };

    const deleteLocalisation = () => {
      setSelectedLocalisations('');
      updateData();
    };

    const onChangeRadioFrench = (e) => {
      setRadioFrench(e.target.value);
      setWarning(true);
    };

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

        <Autocomplete
          title="Filtre géographique"
          placeholder="Lyon, Vendée, ..."
          language={props.language}
          onSubmit={localisationHandler}
          facets={geoFacet.entries}
          facetID="address.localisationSuggestions"
        />

        {
          (selectedLocalisations) ? (
            <div className={classes.Keywords}>
              <span
                onClick={() => {}}
                onKeyPress={() => {}}
                tabIndex={0}
                role="button"
              >
                {selectedLocalisations}
              </span>
              <span
                onClick={() => deleteLocalisation(selectedLocalisations)}
                onKeyPress={() => deleteLocalisation(selectedLocalisations)}
                tabIndex={0}
                role="button"
              >
                <i className="fas fa-times" />
              </span>
            </div>
          ) : null
        }


        <hr />
        {/* isFrench */}
        <Form.Group>
          <Form.Check
            type="radio"
            id="radio-isFrench"
            label="Entités françaises uniquement"
            checked={(radioFrench === 'isFrench')}
            name="radioFrench"
            value="isFrench"
            onChange={onChangeRadioFrench}
          />
          <Form.Check
            type="radio"
            id="radio-notIsFrench"
            label="Entités étrangères uniquement"
            checked={(radioFrench === 'notIsFrench')}
            name="radioFrench"
            value="notIsFrench"
            onChange={onChangeRadioFrench}
          />
          <Form.Check
            type="radio"
            id="radio-all"
            label="Toutes les entités"
            checked={(radioFrench === 'all')}
            name="radioFrench"
            value="all"
            onChange={onChangeRadioFrench}
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

      const obj = {
        address: [{
          address: address[addressMainIndex] || '',
          city: city[addressMainIndex] || '',
          postcode: postcode[addressMainIndex] || '',
          country: country[addressMainIndex] || '',
          gps: {
            lat: structure.fields['address.gps']?.[addressMainIndex]?.coordinates?.[1] || 0,
            lon: structure.fields['address.gps']?.[addressMainIndex]?.coordinates?.[0] || 0,
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

      return obj;
    });

    if (!data) return null;

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
            (!checkWarning() || warning)
              ? (
                <div className={`my-2 p-2 ${classes.MessagesBox}`}>
                  <i className="fas fa-exclamation-triangle mr-2" />
                  <FormattedHTMLMessage id="warning" />
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

  if (idNotFound) {
    return (
      <IntlProvider locale={props.language} messages={msg[props.language]}>
        <div className={classes.aap}>
          <Header title={<FormattedHTMLMessage id="title" />} />
          <Container as="main">
            <Row>
              {getAPIFilters()}
              <Col>
                <div className={classes.callBlock}>
                  Identifiant non trouvé sur le site de la commission
                  <div>
                    <a href="https://ec.europa.eu/info/index_en" target="_blank" rel="noreferrer">https://ec.europa.eu/info/index_en</a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </IntlProvider>
    );
  }

  return (
    <IntlProvider locale={props.language} messages={msg[props.language]}>
      <div className={classes.aap}>
        <Header title={<FormattedHTMLMessage id="title" />} />
        <Container as="main">
          <Row>
            {getAPIFilters()}
            {
              (dataFromScanR?.data?.hits?.hits?.length > 0 && !loading)
                ? getContent()
                : (
                  <Col>
                    <Loader style={{ height: '50vh', width: '50vw' }} />
                  </Col>
                )
            }
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
