import api from "./axios";

export const login = async (form) => {
  const response = await api.post("/Auth/login", {
    email: form.email.trim().toLowerCase(),
    password: form.password.trim(),
  });

  return response.data;
};