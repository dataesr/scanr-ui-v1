import axios from 'axios';
import { API_END_POINT } from './config/config';

const instance = axios.create({ baseURL: API_END_POINT });

export default instance;
