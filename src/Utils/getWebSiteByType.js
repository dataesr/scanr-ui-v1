/**
 * getWebSiteByType
*/
export default function getWebSiteByType(links, type) {
  let url = null;
  if (links) {
    const el = links.find(site => (site.type === type));
    url = (el && el.url) ? el.url : null;
  }
  return url;
}
