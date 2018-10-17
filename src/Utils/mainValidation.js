import { STATUS_ARRAY } from '../config/config';

export default function mainValidation(content) {
  const mainItem = content.filter(item => item.status === 'main');
  if (mainItem.length !== 1) {
    return false;
  }
  const emptyStatus = content.find(item => !STATUS_ARRAY.includes(item.status));
  if (emptyStatus) {
    return false;
  }
  return true;
}
