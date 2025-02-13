import { AxiosInstance } from "axios";
import apiClient from "../infra/http-client";

class BillsServiceClass {
  private apiClient: AxiosInstance;
  constructor() {
    this.apiClient = apiClient;
  }

  async createBills(data: CreateBillsParam): Promise<Bills> {
    const response = await this.apiClient.post("/api/bills", data);
    return response.data;
  }
}

export const BillsService = new BillsServiceClass();
