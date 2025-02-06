import { AxiosInstance } from "axios";
import apiClient from "../infra/http-client";

class AuthServiceClass {
  private apiClient: AxiosInstance;
  constructor() {
    this.apiClient = apiClient;
  }

  async registerAccount(data: SignupFormType): Promise<void> {
    const response = await this.apiClient.post("/api/auth/register", data);
    return response.data;
  }

  async signinAccount(data: SigninFormType): Promise<ResponseSignin> {
    const response = await this.apiClient.post("/api/auth/signin", data);
    return response.data;
  }
}

export const AuthService = new AuthServiceClass();
