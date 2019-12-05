/**
 * getSelectKey
 * Description : Renvoie la valeur d'une clé si elle existe, sino une clé par défaut, sinon la première clé trouvée
 * Utilisation : getSelectKey(globalObj, key, searchedKey, defaultKey)
 * Parametres (ex) : globalObj = ..., label: {fr: 'label fr', en: 'label en'} | en | fr
 * Resultat (ex) : getSelectKey(globalObj, 'label', 'en', 'fr') => "label en"
*/
export default function getSelectKey(globalObj, key, searchedKey, defaultKey) {
  let res = '';
  if (globalObj[key]) {
    if (globalObj[key][searchedKey]) {
      res = globalObj[key][searchedKey];
    } else if (globalObj[key][defaultKey]) {
      res = globalObj[key][defaultKey];
    } else {
      /* Renvoi de la dernière clé trouvée */
      Object.entries(globalObj[key]).forEach((entry) => {
        if (entry[1]) {
          res = globalObj[key][entry[0]];
        }
      });
    }
  }
  return res;
}
