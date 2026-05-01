import api from "./axios";

export const getCustomers = async () => {
  const response = await api.get("/Customers");
  return response.data;
};