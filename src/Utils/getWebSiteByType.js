/**
 * getWebSiteByType
*/
export default function getWebSiteByType(links, type) {
  console.log('links', links);
  let url = null;
  if (links) {
    const el = links.find(site => (site.type === type));
    url = (el && el.url) ? el.url : null;
  }
  return url;
}
