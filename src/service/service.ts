import AuthAPI from './auth.service';

class API {
  auth;
  constructor() {
    this.auth = new AuthAPI();
  }
}

const api = new API();

export default api;