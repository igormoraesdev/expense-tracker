import { bills } from "@/drizzle/schema/bills";

declare global {
  interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
  }

  interface SigninFormType {
    email: string;
    password: string;
  }

  interface SignupFormType {
    name: string;
    email: string;
    password: string;
  }

  type ResponseSignin = User;

  interface CreateBillFormType {
    description: string;
    dueDate: Date;
    amount: string;
    status: StatusEnum;
    category: CategoryEnum;
  }

  interface CreateBillsParam {
    userId: string;
    description: string;
    dueDate: Date;
    amount: number;
    category: CategoryEnum;
    status: CategoryEnum;
  }

  type Bills = typeof bills.$inferInsert;

  interface TotalSpendParams {
    userId: string;
    date: Date;
  }
}

export {};
