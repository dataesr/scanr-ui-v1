import { STATUS_CONFLICT } from '../config/config';

export default function getBoolConflicts(structureEntity) {
  return structureEntity.find(entity => entity.status === STATUS_CONFLICT);
}
