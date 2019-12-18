import React from 'react';
import searchImage from '../../../images/img/search.png';
import entityImage from '../../../images/img/entityPage.png';
import ecosystemImage from '../../../images/img/ecosystem.png';
import focusImage from '../../../images/img/focus.png';

const style = { borderRadius: '16px' }
const ScanrIs = () => (
  <div className="container flex-column p-5">
    <div className="d-flex flex-nowrap py-4">
      <img style={style} src={searchImage} height="300px" aria-hidden alt="" />
      <div className="d-flex flex-column align-items-center justify-content-center px-4">
        <h3>scanR, un moteur de recherche</h3>
        <p>
          Moteur de recherche, scanR permet de rechercher dans 4 types d&apos;objets, les entitées et structures, les autheurs et chercheurs, les financements et projets et les productions au travers des thèses, des publications et des brevets.
        </p>
      </div>
    </div>
    <div className="d-flex flex-nowrap">
      <div className="d-flex flex-column align-items-center justify-content-center px-4">
        <h3>scanR connecte...</h3>
        <p>
        scanR lie tout ces objets les uns aux autres. Il associe les projets de recherche aux laboratoires qui en bénéficient, des publications à leurs auteurs, etc. scanR fait aussi des liens avec des structures étrangères et permet de voir les collaborations international des acteurs. Ces liens sont retrouvés par scanR et ne sauraient être exhaustifs.
        </p>
      </div>
      <img src={ecosystemImage} height="250px" aria-hidden alt="" />
    </div>
    <div className="d-flex flex-nowrap">
      <img src={entityImage} height="250px" aria-hidden alt="" />
      <div className="d-flex flex-column align-items-center justify-content-center px-4">
        <h3>scanR restitue de l&apos;information</h3>
        <p>
          scanR aide à la caractérisation des objets qu&apos;il contient, en structurant l&apos;information sur des pages de présentation et en proposant des visualisations et en synthétisant l&apos;information.
        </p>
      </div>
    </div>
    <div className="d-flex flex-nowrap">
      <div className="d-flex flex-column align-items-center justify-content-center px-4">
        <h3>scanR synthétse de l&apos;information</h3>
        <p>
          scanR propose des vues sythétiques sur des sujets divers, souvent en lien avec l&apos;actialité au travers des focus.
        </p>
      </div>
      <img src={focusImage} height="250px" aria-hidden alt="" />
    </div>
  </div>
);
export default ScanrIs;
