import { TotalSpendData } from "@/hooks/useDashboardData";
import { AxiosInstance } from "axios";
import apiClient from "../infra/http-client";

class BillsServiceClass {
  private apiClient: AxiosInstance;
  constructor() {
    this.apiClient = apiClient;
  }

  async createBills(data: CreateBillsParam): Promise<Bill> {
    const response = await this.apiClient.post("/api/bills", data);
    return response.data;
  }

  async createBillsByLastMonth(date: Date, userId: string): Promise<Bill[]> {
    const response = await this.apiClient.post("/api/bills/month", {
      date,
      userId,
    });
    return response.data;
  }

  async getTotalSpend(params: TotalSpendParams): Promise<TotalSpendData> {
    const response = await this.apiClient.get(
      `/api/bills/total-spend?userId=${params.userId}&date=${params.date}`
    );
    return response.data;
  }

  async getBills(params: BillsListParams): Promise<Bill[]> {
    const response = await this.apiClient.get(
      `/api/bills?userId=${params.userId}&date=${params.date}`
    );
    return response.data;
  }

  async getAllBills(params: AllBillsParams): Promise<AllBillsResponse> {
    const response = await this.apiClient.get(
      `/api/bills/all?userId=${params.userId}&page=${params.page}&limit=${params.limit}`
    );
    return response.data;
  }

  async updateBill(data: UpdateBillParam): Promise<Bill> {
    const response = await this.apiClient.patch("/api/bills", data);
    return response.data;
  }
  async deleteBill(billId: string): Promise<void> {
    const response = await this.apiClient.delete("/api/bills", {
      data: { billId },
    });
    return response.data;
  }
}

export const BillsService = new BillsServiceClass();
