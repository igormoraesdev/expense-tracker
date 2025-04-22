import { AxiosInstance } from "axios";
import Stripe from "stripe";
import apiClient from "../infra/http-client";

class PlansServiceClass {
  private apiClient: AxiosInstance;
  constructor() {
    this.apiClient = apiClient;
  }

  async checkoutSession(
    planId: string
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const response = await this.apiClient.post(
      `/api/checkout_sessions`,
      {
        planId,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  }

  async getPlans(): Promise<Plans[]> {
    const response = await this.apiClient.get("/api/plans");
    return response.data;
  }
}

export const PlansService = new PlansServiceClass();
