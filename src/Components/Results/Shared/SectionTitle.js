import React from 'react';
import PropTypes from 'prop-types';

import Contribute from './Contribute/Contribute';
import LexiconModal from '../../Shared/Lexicon/LexiconModal/LexiconModal';

import classes from './SectionTitle.scss';

/**
 * SectionTitleViewMode
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
 */

const SectionTitle = (props) => {
  const renderContributionLink = () => ((props.id && props.objectType && !props.subTitle)
    ? (
      <span className="pl-2 ml-auto my-2">
        <Contribute
          language={props.language}
          sectionName={props.title}
          objectId={props.id}
          objectType={props.objectType}
        />
      </span>
    )
    : null);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="d-flex flex-wrap align-items-center flex-grow-1 mx-1">
          <i className={`fas ${props.icon} ${classes.Title}`} />
          <span className={`pl-0 pl-lg-2 my-2 ${classes.Title}`}>
            {(props.total) ? (props.total).toLocaleString(props.language) : null}
          &nbsp;
            {props.title}
          &nbsp;
          </span>
          {(props.subTitleLink || props.lexicon) ? (
            <div className="mb-sm-3 mb-xl-0 d-flex align-items-center">
              {
                (props.lexicon) ? (
                  <div className="d-flex">
                    <LexiconModal language={props.language} target={props.lexicon}>
                      <i className={`fa fa-info-circle ${classes.pointer} ${classes.Title} ${classes.fs_large}`} />
                    </LexiconModal>
                  </div>
                ) : null
              }
              {
                (props.subTitleLink) ? (
                  <div
                    role="button"
                    tabIndex={0}
                    className={`ml-3 d-flex align-items-center ${classes.pointer}`}
                    onKeyPress={props.modalHandler}
                    onClick={props.modalHandler}
                  >
                    <i className={`fa fa-plus-square ${classes.Title}`} />
                    <span className={`ml-1 ${classes.Text}`}>{props.subTitleLink}</span>
                  </div>
                ) : null
              }
            </div>
          )
            : null}
          <div className="mb-5">{props.subTitle}</div>
          {(!props.total || props.total === 0) && renderContributionLink()}
        </div>
        {props.total > 0
          && (props.viewModeClickHandler && props.viewMode)
          ? (
            <div className="d-flex flex-wrap align-items-center flex-grow-1 mx-1">
              <div
                role="button"
                tabIndex={0}
                aria-labelledby="ViewList"
                onClick={() => props.viewModeClickHandler('list')}
                onKeyPress={() => props.viewModeClickHandler('list')}
                className={classes.ViewChangeButton}
              >
                <div className="d-flex flex-nowrap align-items-center">
                  <span
                    className={`mr-2 btn ${classes.SquareButton} ${(props.viewMode === 'list') ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}
                  >
                    <i aria-hidden className="fas fa-list" />
                  </span>
                  <p className={`m-0 ${classes.Text}`} id="ViewList">
                    {
                        (props.language === 'fr')
                          ? 'Liste'
                          : 'List'
                      }
                  </p>
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                aria-labelledby="ViewGraph"
                onClick={() => props.viewModeClickHandler('graph')}
                onKeyPress={() => props.viewModeClickHandler('graph')}
              >
                <div className="mx-3 d-flex flex-nowrap align-items-center">
                  <span
                    className={`mx-2 btn ${classes.SquareButton} ${(props.viewMode === 'graph') ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}
                  >
                    <i aria-hidden className="fas fa-chart-pie" />
                  </span>
                  <p className={`m-0 ${classes.Text}`} id="ViewGraph">
                    Visualisation
                  </p>
                </div>
              </div>
              {renderContributionLink()}
            </div>
          ) : null }
      </div>
    </div>
  );
};

export default SectionTitle;

SectionTitle.propTypes = {
  language: PropTypes.string.isRequired,
  lexicon: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.any.isRequired,
  subTitle: PropTypes.object,
  subTitleLink: PropTypes.object,
  id: PropTypes.string,
  objectType: PropTypes.string,
  total: PropTypes.number,
  viewModeClickHandler: PropTypes.func,
  modalHandler: PropTypes.func,
  viewMode: PropTypes.string,
};
