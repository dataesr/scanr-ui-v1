/**
 * pick
 * Description : Renvoi un objet contenant uniquement les clés
 * Utilisation : pick('DOI', 'title')(obj)
 * Parametres (ex) : obj = {label: {fr: 'label fr', en: 'label en'}}
 * Resultat (ex) : pick('fr')(obj) => {fr: "label fr"}
*/
export default function pick(...args) {
  return obj => args.reduce((a, e) => ({ ...a, [e]: obj[e] }), {});
}
