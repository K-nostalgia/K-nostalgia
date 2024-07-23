import axios, { AxiosInstance } from 'axios';
import AuthAPI from './auth.service';

class API {
  private axios: AxiosInstance;

  auth;
  constructor() {
    this.axios = axios.create({ baseURL: 'http://localhost:3000' });

    this.auth = new AuthAPI(this.axios);
  }
}

const api = new API();

export default api;