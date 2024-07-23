import { Tables } from '@/types/supabase';
import { AxiosInstance } from 'axios';

type UserType = Tables<'users'>

class AuthAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async logIn(email: string, password: string) {
    const path = '/api/auth/log-in';

    const response = await this.axios.post<UserType>(path, { email, password });

    return response.data;
  }

  async signUp(email: string, password: string, nickname?: string) {
    const path = '/api/auth/sign-up';
    const response = await this.axios.post<UserType>(path, { email, password, nickname });
    return response.data;
  }

  async logOut() {
    const path = '/api/auth/log-out';

    const response = await this.axios.delete<UserType>(path);
    return response.data;
  }
}

export default AuthAPI;
