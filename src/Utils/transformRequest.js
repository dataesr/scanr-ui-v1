/**
 * transformRequest
 * Description : transform une requete depuis l'URL vers la requete elasticsearch equivalente
 * Utilisation : transformRequest(request)
*/
export default function transformRequest(requests) {
  const req = { ...requests };
  if (!req.query) {
    req.query = '';
  }
  if (requests.page) {
    req.page -= 1;
  }
  if (req.pageSize && req.pageSize < 10) {
    req.pageSize = 10;
  }
  return req;
}
