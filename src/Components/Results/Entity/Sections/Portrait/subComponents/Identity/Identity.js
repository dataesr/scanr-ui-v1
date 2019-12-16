import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';
import LogoCard from '../../../../../../Shared/Ui/LogoCard/LogoCard';
import SimpleCard from '../../../../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleListCard from '../../../../../../Shared/Ui/SimpleListCard/SimpleListCard';
import DescriptionCard from '../../../../../../Shared/Ui/DescriptionCard/DescriptionCard';

import getSelectKey from '../../../../../../../Utils/getSelectKey';
import getWebSiteByType from '../../../../../../../Utils/getWebSiteByType';

import classes from './Identity.scss';

/**
 * Identity
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Identity = (props) => {
  // nom
  const name = getSelectKey(props, 'name', props.language, 'fr');

  // acronym
  const acronym = getSelectKey(props, 'acronym', props.language, 'fr');

  // label
  const label = (acronym) ? `${name} (${acronym})` : name;

  // description
  const description = getSelectKey(props, 'description', props.language, 'fr');
  const externalIdDisplayed = [];
  for (let i = 0; i < props.externalIds.length; i += 1) {
    if (props.externalIds[i].type.toLowerCase() !== 'docid') {
      externalIdDisplayed.push(props.externalIds[i]);
    }
  }
  return (
    <div className="col-md-6">
      <div className={classes.Identity}>
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle title={<FormattedHTMLMessage id="Entity.Portrait.Identity.title" />} />
          </div>
        </div>

        <div className="row">
          <div className={`col-lg-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-id-card"
              title={<FormattedHTMLMessage id="Entity.Portrait.Identity.name" />}
              label={label}
              tooltip=""
            />
          </div>
          <div className={`col-lg-6 ${classes.CardContainer}`}>
            <LogoCard
              language={props.language}
              src={`https://scanr.enseignementsup-recherche.gouv.fr/static/logos/${props.id}.png`}
              url={`https://scanr-preprod.sword-group.com/api/v2/structures/screenshot/${props.id}`}
              cssClass="Height150"
              targetUrl={getWebSiteByType(props.links, 'main')}
            />
          </div>
          <div className={`col-lg-6 ${classes.CardContainer}`}>
            <SimpleListCard
              language={props.language}
              logo="fas fa-qrcode"
              title={<FormattedHTMLMessage id="Entity.Portrait.Identity.id" />}
              label={props.id}
              list={externalIdDisplayed}
              labelListButton={<FormattedHTMLMessage id="Entity.Portrait.Identity.externalIdsButtons" />}
              tooltip=""
            />
          </div>
          <div className={`col-lg-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-flask"
              title={<FormattedHTMLMessage id="Entity.Portrait.Identity.nature" />}
              label={props.nature || ''}
              tooltip=""
            />
          </div>
          {
            (description)
              ? (
                <div className={`col-lg-12 ${classes.CardContainer}`}>
                  <DescriptionCard
                    language={props.language}
                    title={<FormattedHTMLMessage id="Entity.Portrait.Identity.description.title" />}
                    text={`${description}`}
                    tooltip=""
                  />
                </div>
              ) : null
          }
        </div>
      </div>
    </div>
  );
};

export default Identity;
/* eslint-disable */
Identity.propTypes = {
  language: PropTypes.string.isRequired,
  acronym: PropTypes.array,
  description: PropTypes.object,
  externalIds: PropTypes.array,
  links: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.object,
  nature: PropTypes.string,
};
