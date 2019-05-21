/**
 * getSelectKey
 * Description : Renvoie la valeur d'une clé si elle existe
 * Utilisation : getSelectKey(globalObj, key, searchedKey, defaultKey)
 * Parametres (ex) : globalObj = ..., label: {fr: 'label fr', en: 'label en'} | en | fr
 * Resultat (ex) : getSelectKey(globalObj, 'label', 'en', 'fr') => "label en"
*/
export default function getSelectKey(globalObj, key, searchedKey, defaultKey) {
  /* eslint-disable */
  if (globalObj[key]) {
    if (globalObj[key][searchedKey]) {
      return globalObj[key][searchedKey];
    } else if (globalObj[key][defaultKey]) {
      return globalObj[key][defaultKey];
    }

  }

  return '';
  /* eslint-enable */
}
