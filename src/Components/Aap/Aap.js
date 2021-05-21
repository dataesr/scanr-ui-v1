import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import {
  Container, Row, Col, Form,
} from 'react-bootstrap';

import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import EntityCard from '../Search/Results/ResultCards/EntityCard';

import { API_STRUCTURES_SEARCH_END_POINT } from '../../config/config';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './custom.scss';

const msg = {
  fr: messagesFr,
  en: messagesEn,
};
// ce-sc5-07-2020
// IMI2-2015-07-07
const AapPage = (props) => {
  const pageSize = 100;
  const entitiesPerPage = 20;
  const [step, setStep] = useState('1');
  const [callObject, setCallObject] = useState({});
  const [keywords, setKeywords] = useState([]);
  const [requiredKeywords, setRequiredKeywords] = useState([]);
  const [responsesFromScanR, setResponsesFromScanR] = useState([]);
  const [mergedStructures, setMergedStructures] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFrenchOnly, setIsFrenchFilter] = useState(false);
  const [sectorsFilter, setSectorsFilter] = useState([
    { key: 'orgaInter', kindLabel: 'Organisation internationale', active: true },
    { key: 'prive', kindLabel: 'Secteur privé', active: true },
    { key: 'public', kindLabel: 'Secteur public', active: true },
    { key: 'struct', kindLabel: 'Structure de recherche', active: true },
  ]);
  const [currentPage, setCurrentPage] = useState(1);


  const getDataFromCE = async () => {
    try {
      const responseCallFromCE = await Axios.get(`https://ec.europa.eu/info/funding-tenders/opportunities/data/topicDetails/${props.match.params.id.toLowerCase()}.json`);
      const { TopicDetails } = responseCallFromCE.data;
      setCallObject(TopicDetails);
      setKeywords(TopicDetails.keywords);
      setStep('2_0');
    } catch (err) {
      throw (err);
    }
  };

  const getDataFromScanR = async () => {
    const ind = step.split('_')[1];
    const obj = {
      query: `"${keywords[ind]}"`,
      pageSize,
    };
    Axios.post(API_STRUCTURES_SEARCH_END_POINT, obj).then((respFromScanR) => {
      if (ind === '0') {
        setResponsesFromScanR([respFromScanR]);
      } else {
        setResponsesFromScanR(oldArray => [...oldArray, respFromScanR]);
      }

      // Etape suivante
      if (ind < (keywords.length - 1)) {
        setStep(`2_${parseInt(ind, 10) + 1}`);
      } else {
        setStep('3');
      }
    });
  };

  const mergeData = () => {
    const structuresFromScanR = [];
    // Parcours de toutes les structures
    responsesFromScanR.forEach((keywordData) => {
      // liste des structures de chaque mot-clé
      keywordData.data.results.forEach((struct) => {
        const findedStructure = structuresFromScanR.find(el => (el.id === struct.value.id));
        if (!findedStructure) {
          structuresFromScanR.push({
            count: 1,
            ...struct.value,
            highlightsKeywords: [keywordData.data.request.query.slice(1, -1)],
          });
        } else {
          findedStructure.count += 1;
          findedStructure.highlightsKeywords = [...findedStructure.highlightsKeywords, keywordData.data.request.query.slice(1, -1)];
        }
      });
    });
    setMergedStructures(structuresFromScanR);
    setStep('4');
  };

  const sortData = () => {
    setSortedData(mergedStructures.sort((a, b) => (b.count - a.count)));
    setStep('5');
  };

  const submitSearch = () => {
    window.location.href = `/aap/${document.getElementById('query').value}`;
  };

  const getStep = () => {
    if (step.charAt(0) === '2') {
      return (
        <Col className={classes.steps}>
          <FormattedHTMLMessage
            id="step2"
            defaultMessage="step2"
          />
          <span className="mx-2">
            {keywords[step.split('_')[1]]}
          </span>
          <span className="mx-2">
            {`${parseInt(step.split('_')[1], 10) + 1}/${keywords.length}`}
          </span>
          <i className="fas fa-spinner fa-pulse ml-1" />
        </Col>
      );
    }
    return (
      <Col className={classes.steps}>
        <FormattedHTMLMessage
          id={`step${step}`}
          defaultMessage={`step${step}`}
        />
        <i className="fas fa-spinner fa-pulse ml-3" />
      </Col>
    );
  };

  const addKeyword = () => {
    setKeywords(oldArray => [...oldArray, document.getElementById('keyword').value]);
  };

  const deleteKeyword = (kwToDelete) => {
    setKeywords(keywords.filter(k => (k !== kwToDelete)));
    if (requiredKeywords.includes(kwToDelete)) {
      setRequiredKeywords(requiredKeywords.filter(k => (k !== kwToDelete)));
    }
  };

  const checkKeywords = () => {
    if (keywords.length !== callObject?.keywords?.length) {
      return false;
    }
    let checker = true;
    keywords.forEach((k) => {
      if (!callObject.keywords.includes(k)) {
        checker = false;
      }
    });
    return checker;
  };

  const applyFilters = () => {
    let data = [...sortedData];
    if (isFrenchOnly) {
      data = sortedData.filter(el => (el.isFrench === true));
    }

    // Filtre sur les secteurs
    data = data.filter(el => (el?.kind?.some(k => sectorsFilter
      .filter(s => (s.active))
      .map(s => s.kindLabel)
      .includes(k))));

    // Filtre sur les mots-clés requis
    if (requiredKeywords.length > 0) {
      // OR - au moins un des mots-clés required doit êre présent dans l'entité
      // data = data.filter(el => (el.highlightsKeywords.some(kw => requiredKeywords.includes(kw))));

      // AND - Tous les mots-clés required doivent être présents dans l'entité
      data = data.filter(el => (requiredKeywords.every(kw => el.highlightsKeywords.includes(kw))));
    }

    setFilteredData(data);
    setStep('6');
  };

  useEffect(() => {
    switch (step.split('_')[0]) {
      case '1':
        getDataFromCE(props.match.params.id);
        break;
      case '2':
        getDataFromScanR();
        break;
      case '3':
        mergeData();
        break;
      case '4':
        sortData();
        break;
      case '5':
        applyFilters();
        break;
      default:
        break;
    }
  }, [step]);

  const onIsFrenchChange = (e) => {
    setIsFrenchFilter(e.target.checked);
    setStep('5');
  };

  const updateSectorsFilter = (sectorKey) => {
    const obj = [...sectorsFilter];
    const idx = obj.findIndex(sector => sector.key === sectorKey);
    const previousState = obj[idx].active;
    obj[idx].active = !previousState;
    setSectorsFilter(obj);
    setStep('5');
  };

  const addToRequiredKeywords = (kw) => {
    if (requiredKeywords.includes(kw)) {
      setRequiredKeywords(requiredKeywords.filter(k => (k !== kw)));
    } else {
      setRequiredKeywords(oldArray => [...oldArray, kw]);
    }
    setStep('5');
  };

  const getContent = () => {
    const nbStruct = filteredData.filter(s => (s.count > 1)).length;
    const nbPages = Math.ceil(nbStruct / entitiesPerPage);

    return (
      <>
        <Col md={4} className={classes.AsideContainer}>
          <>
            <p className={classes.subTitle}>
              <FormattedHTMLMessage id="anotherId" />
            </p>
            <input
              type="text"
              id="query"
              className={classes.SearchBar}
            />
            <button
              className={`btn ml-1 ${classes.btn_dark} ${classes.btn_dark_margin54} ${classes.BtnSearch}`}
              type="button"
              onClick={submitSearch}
            >
              <i className="fas fa-search" />
            </button>
            <hr className={classes.separator} />

            <p className={classes.subTitle}>
              <FormattedHTMLMessage id="keywords" />
            </p>
            <input
              type="text"
              id="keyword"
              className={classes.SearchBar}
            />
            <button
              className={`btn ml-1 ${classes.btn_dark} ${classes.btn_dark_margin54} ${classes.BtnSearch}`}
              type="button"
              onClick={() => addKeyword()}
            >
              <i className="fas fa-plus" />
            </button>
            <p className={classes.requiredKeywords}>
              <FormattedHTMLMessage id="requiredKeywords" />
            </p>
            <ul className={classes.Keywords}>
              {
                keywords.map(kw => (
                  <li key={kw} className={(requiredKeywords.includes(kw)) ? classes.required : null}>
                    <span
                      onClick={() => addToRequiredKeywords(kw)}
                      onKeyPress={() => addToRequiredKeywords(kw)}
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
            <div className="text-center">
              <button
                className={`btn ml-1 ${classes.btn_dark} ${classes.btn_dark_margin54} ${classes.BtnSearch}`}
                type="button"
                onClick={() => setStep('2_0')}
                disabled={checkKeywords()}
              >
                <FormattedHTMLMessage id="button" />
                <i className="fas fa-search ml-3" />
              </button>
            </div>
          </>
          <hr className={classes.separator} />
          <p className={classes.title}>
            <FormattedHTMLMessage id="filterBy" />
          </p>
          <Form.Group>
            <Form.Check
              type="checkbox"
              id="isFrenchOnly"
              label="Entités françaises uniquement"
              checked={isFrenchOnly}
              onChange={e => onIsFrenchChange(e)}
            />
          </Form.Group>
          <p className={classes.subTitle}>
            Secteurs
          </p>
          {
            sectorsFilter.map((sector, i) => (
              <Form.Check
                key={sector.key}
                type="checkbox"
                id={`isSector${i}`}
                label={sector.kindLabel}
                checked={sector.active}
                onChange={() => updateSectorsFilter(sector.key)}
              />
            ))
          }

        </Col>
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
            (!checkKeywords() || requiredKeywords.length > 0)
              ? (
                <div className={`my-2 p-2 ${classes.MessagesBox}`}>
                  {
                    (!checkKeywords()) ? (
                      <>
                        <i className="fas fa-exclamation-triangle mr-2" />
                        <FormattedHTMLMessage id="warning" />
                      </>
                    ) : null
                  }
                  {
                    (requiredKeywords.length > 0)
                      ? (
                        <>
                          <i className="fas fa-exclamation-triangle mr-2" />
                          <FormattedHTMLMessage id="requiredKeywordsMsg" />
                          {requiredKeywords.join(', ')}
                        </>
                      ) : null
                  }
                </div>
              ) : null
          }
          <p className="my-2">
            <FormattedHTMLMessage id="message" values={{ count: nbStruct }} />
            &nbsp;
            {filteredData.length}
          </p>
          {
            filteredData.map((s, index) => {
              if (s.count > 1 && index >= ((currentPage - 1) * entitiesPerPage) && index < (currentPage * entitiesPerPage)) {
                return (
                  <div key={s.id}>
                    <EntityCard
                      data={s}
                      language={props.language}
                      highlights={s.highlights}
                      highlightsKeywords={s.highlightsKeywords.join(', ')}
                    />
                  </div>
                );
              }
              return null;
            })
          }
          <Row className={`mx-1 mb-2 ${classes.Pagination}`}>
            <Col>
              {
                (currentPage > 1) ? (
                  <button
                    type="button"
                    className={`btn ml-1 ${classes.btn_scanrBlue} ${classes.BtnSearch}`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="fas fa-chevron-left mr-2" />
                    <FormattedHTMLMessage id="previous" />
                  </button>
                ) : null
              }
            </Col>
            <Col className="text-center">
              {`${currentPage}/${nbPages}`}
            </Col>
            <Col className="text-right">
              {
                (currentPage < nbPages) ? (
                  <button
                    type="button"
                    className={`btn ml-1 ${classes.btn_scanrBlue} ${classes.BtnSearch}`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <FormattedHTMLMessage id="next" />
                    <i className="fas fa-chevron-right ml-2" />
                  </button>
                ) : null
              }
            </Col>
          </Row>
        </Col>
      </>
    );
  };

  return (
    <IntlProvider locale={props.language} messages={msg[props.language]}>
      <div className={classes.aap}>
        <HeaderTitle
          language={props.language}
          labelkey="aap"
          url1="/"
          url2="/focus"
        />
        <Container as="main">
          <Row>
            {
              (step === '6')
                ? getContent()
                : getStep()
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
