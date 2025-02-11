export enum StatusEnum {
  Paid = "Paid",
  Pending = "Pending",
  Expired = "Expired",
}

export const statusList = [
  StatusEnum.Paid,
  StatusEnum.Pending,
  StatusEnum.Expired,
];

export enum CategoryEnum {
  Utilities = "Utilities",
  Phone = "Phone",
  House = "House",
  Card = "Card",
  Food = "Food",
  Health = "Health",
  Other = "Other",
}

export const categoryList = [
  CategoryEnum.Card,
  CategoryEnum.Utilities,
  CategoryEnum.Phone,
  CategoryEnum.House,
  CategoryEnum.Food,
  CategoryEnum.Health,
  CategoryEnum.Other,
];
