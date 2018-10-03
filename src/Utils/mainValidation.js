export default function mainValidation(content) {
  const mainItem = content.filter(item => item.status === 'main');
  if (mainItem.length === 1) {
    return true;
  }
  return false;
}
