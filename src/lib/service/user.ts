import { AxiosInstance } from "axios";
import apiClient from "../infra/http-client";

class UserServiceClass {
  private apiClient: AxiosInstance;
  constructor() {
    this.apiClient = apiClient;
  }

  async updateUser(data: UpdateUserParam): Promise<User> {
    const response = await this.apiClient.patch("/api/user", data);
    return response.data;
  }
}

export const UserService = new UserServiceClass();
