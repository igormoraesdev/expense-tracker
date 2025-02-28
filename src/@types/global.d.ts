import { bills } from "@/drizzle/schema/bills";

declare global {
  interface User {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface SigninFormType {
    email: string;
    password: string;
  }

  interface SignupFormType {
    name: string;
    email: string;
    password: string;
    phone: string;
    confirmPassword: string;
  }

  type ResponseSignin = User;

  interface CreateBillFormType {
    description: string;
    dueDate: Date;
    amount: string;
    status: StatusEnum;
    category: CategoryEnum;
    date?: Date;
  }

  interface CreateBillsParam {
    userId: string;
    description: string;
    dueDate: Date;
    amount: number;
    category: CategoryEnum;
    status: CategoryEnum;
  }

  type Bill = typeof bills.$inferInsert;

  interface TotalSpendParams {
    userId: string;
    date: Date;
  }

  type BillsListParams = TotalSpendParams;

  interface DashboardFormType {
    date: Date;
  }

  interface UpdateBillParam {
    billId: string;
    bill: Bill;
  }
  interface UpdateUserParam {
    userId: string;
    user: Partial<User>;
  }

  interface RegisterPhoneFormType {
    phone: string;
  }
}

export {};
