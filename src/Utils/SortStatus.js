import { STATUS_ARRAY } from '../config/config';

const sortStatus = (a, b) => STATUS_ARRAY.indexOf(a.status) - STATUS_ARRAY.indexOf(b.status);

export default sortStatus;
